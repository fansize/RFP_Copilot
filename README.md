# Documentation of Automated GenAI RPF

Automating the flow of receiving RFPs and processing them through Azure services into a format that can be used by GPT involves several Azure components working together. Here's a detailed step-by-step guide on setting up this automation:

## Task 1: AI-Driven Document Extraction

### Step 1: Receive and Store RFPs in Azure Blob Storage

Setup Azure Blob Storage:

1. Create a Blob Storage Account: This is where all incoming RFP documents will be stored. Create a container specifically for RFPs.
2. Secure Access: Ensure that access to the Blob Storage is secured using Azure Active Directory and proper access policies to maintain confidentiality and integrity of the RFP data.

Automate Document Uploads:

1. Email to Blob Storage: If RFPs are received via email, use Microsoft Power Automate (formerly Microsoft Flow) to create a flow that automatically saves email attachments directly to the specified Blob Storage container.
2. Web Portal Uploads: If your company uses a web portal for RFP submissions, integrate the backend of the portal with Azure Blob Storage SDKs to upload documents directly to Blob Storage upon submission.

### Step 2: Trigger Azure Logic Apps for Document Processing

Configure Azure Logic Apps:

1. Create a Logic App: This app will be triggered whenever a new file is uploaded to your RFP container in Blob Storage.
2. Add a Blob Storage Trigger: Set up a trigger in the Logic App for when a new file is added to the Blob Storage container designated for RFPs.

### Step 3: PreProcess Documents Using Azure Cognitive Services

Route Documents for Data Extraction:

1. Conditional Operations: Based on the file type (.pdf, .docx, .jpg), use conditions within the Logic App to route the document to the appropriate Cognitive Service:
   - PDFs and DOCX Files: Send to Azure AI Document Intelligence, which extracts text and key data from the documents.
   - Images: Send to Azure Computer Vision for optical character recognition (OCR) to convert images into readable text.

Extract and Store Processed Data:

1. Store Extracted Data: Use Azure Functions within the Logic App to handle the data returned by Cognitive Services. Format this data into a structured JSON or similar format and store it in Azure Cosmos DB or another Blob Storage container for easy retrieval and further processing.

### Step 4: Generate Useful Data for GPT Processing

Prepare Data for GPT:

1. Aggregate Data: Before sending the data to GPT, aggregate and format the extracted information in a way that aligns with what GPT needs to generate insights or summaries. This might include combining text from multiple documents or summarizing key points.
2. Use Azure Functions: Set up another Azure Function to fetch the processed data from storage, format it accordingly, and then prepare it for sending to GPT.

### Step 5: Integrate with GPT for Final Processing

Send Data to GPT:

1. API Integration: Use the OpenAI API to send the prepared data to GPT. The API call can be made from an Azure Function, which handles the request and response.
2. Receive GPT Output: Capture the output from GPT, which could be a summary, answer, or other relevant text, and store this output back in Azure Blob Storage for final use, such as generating a response to the RFP.

## Task 2: AI Summarizer & AI-Driven Document Extraction

To implement the last step of the automation process, where data prepared from Azure Cognitive Services is sent to GPT for summary generation and intelligent product matching, follow these detailed steps. This guide will focus on integrating GPT to analyze and match product specifications from your catalog with requirements identified from RFPs and to generate concise summaries:

### Step 1: Send Data to GPT for Processing

1. API Setup:

   - Configure the OpenAI API in Azure Function. Ensure we have the appropriate API keys and permissions set up to use OpenAI’s services.
   - Prepare the API request, including the properly formatted JSON payload that contains the RFP data.

2. Create GPT Prompts:

   - Develop specific prompts that instruct GPT on what tasks to perform.

   For AI Summarizer:

   - The Prompt “Using the extracted data, please reformat and summarize it into a structured format that is aligned with our analysis needs. Organize the summary into two main sections: 'Product Features' and 'Deadline Requirements'. Under 'Product Features', categorize the data by key attributes Including:-
     - processor type
     - RAM
     - storage capacity
     - screen size
     - battery life
     - price range
     - operating system
     - graphics
       For 'Deadline Requirements', clearly outline any specified delivery timelines”

   For Intelligent Product Matcher:

   - The Prompt “Analyze the summarized 'Product Features' RFP, focusing specifically on product specifications. Compare these specifications with each product in our catalog. Determine which product has the highest similarity score in relation to the RFP specifications and provide the name of that product and give me output which you determined”

   Also, It is necessary to feed the data of all the catalogues which the company serves so that it could compare possible similar products and calculate the matric Similarity Score which is easy to make decision on.

   These prompts are present in respective GPT APIs in the dashboard which could be easily accessible with a single click to the employee decreasing his task to check all documents and mail manually.

## Task 3: Automated Proposal Drafting

To integrate the ChatGPT API's output with Microsoft Copilot for sending proposals, we'll need to establish a smooth data flow between the dashboard (where your catalog data and RFP requirements are compared), the ChatGPT API, and Microsoft Copilot within the Microsoft 365 environment.

### Step 1: Data Preparation and API Integration

1. Prepare Data:

   - Ensure the dashboard data is structured and accessible. This might involve having the dashboard data (like selected RFP requirements and matching catalog products) in a format that can be easily consumed by APIs, such as JSON.

2. ChatGPT API Setup:
   - Configure the ChatGPT API to generate proposal text based on the selected products and requirements. You'll send it the necessary data, and it will return a well-structured proposal draft.

### Step 2: Connect ChatGPT with Microsoft Copilot

1. Automate Data Transfer:

   - Use Microsoft Power Automate to create a flow that triggers when the ChatGPT API has processed the proposal draft. This flow would capture the API's response.

2. Microsoft Copilot Setup:

   - Since Copilot is integrated into Microsoft 365 apps, ensure that the data from ChatGPT can be fed into a Microsoft Word document where Copilot is active. This might involve setting up a template in Word that can receive input from Power Automate.

3. Populate Proposal Template:
   - Create a Word template that includes placeholders for the different sections of the proposal that ChatGPT will generate. Use Power Automate to push data into this template, filling the placeholders with the content generated by ChatGPT.

### Step 3: Refinement and Review

1. Utilize Copilot for Refinement:

   - Once the initial draft is populated in Word, utilize Microsoft Copilot’s capabilities to refine and polish the text. Copilot can suggest improvements, grammar corrections, and even help with formatting to ensure the proposal is client-ready.

2. Manual Review Process:
   - Set up a review process where the draft can be checked by a human team member. This can be facilitated through collaboration tools like Microsoft Teams, which is integrated with Microsoft 365 and can be used for notifications and reviews.

### Step 4: Send the Proposal

1. Final Approval:

   - After the manual review and any final adjustments by Copilot, have a final approval step where a senior manager or the sales team approves the proposal for dispatch.

2. Automate Dispatch Using Outlook:

   - Configure Power Automate to send the approved proposal via Outlook. The flow can attach the finalized Word document to an email and send it to the customer’s email address.

3. CRM Integration:
   - Ensure that all interactions and the final proposal are logged in your CRM system. This can also be automated using Power Automate to update the CRM once the proposal is sent.

## Task 4: Economic Feasibility Analysis

To automate the process of obtaining approval for a proposal based on its economic feasibility, incorporating certain predefined metrics before sending it to the company that issued the RFP, follow these detailed steps. This system ensures that all proposals meet your company's economic standards and requirements efficiently, reducing the risk of delays and enhancing decision-making accuracy.

### Step 1: Define Economic Metrics and Thresholds

1. Key Metrics:
   - The financial metrics are critical for assessing the economic feasibility of a proposal. Common metrics include ROI (Return on Investment), profit margin, payback period, and total cost.
   - Establish threshold values for these metrics that the proposal must meet or exceed to be considered feasible.

### Step 2: Setup Proposal Submission and Initial Review

1. Automated Proposal Submission:

   - Configure your CRM or ERP system to automatically generate a draft proposal based on the RFP details and send it to a designated internal review system or platform.

2. Initial Economic Analysis:
   - Use financial modeling tools integrated within the financial systems to automatically calculate the defined metrics based on the proposal’s details like projected costs and expected revenue.

### Step 3: Integrate with Business Intelligence Tools for Automated Analysis

1. Microsoft Azure AI Tool Integration:
   - Azure Machine Learning is a cloud-based service for creating and managing machine learning models. It allows you to build, train, and deploy models that can perform various types of financial analysis.
   - Using Azure Machine Learning pipelines to automate the data ingestion, model training, validation, and deployment processes.
   - We can build predictive models using Azure ML’s designer or automated ML capabilities. For financial analysis, we can train the model to do analysis for ROI (Return on Investment), profit margin, payback period, and total cost, from the data and historical data.

### Step 4: Automation with Azure Logic Apps and Azure Functions

To automate the financial analysis process, you can integrate Azure Machine Learning with Azure Logic Apps and Azure Functions:

Trigger Analysis:

- Set up Azure Logic Apps to automatically trigger financial analysis tasks based on specific events, such as the close of a financial period, receipt of new data, or a request from a user.
- Use Azure Functions to run code that initiates data retrieval and sends it to the trained Azure ML models for prediction.

Processing Results:

- Once Azure Machine Learning processes the data and returns the results, use Azure Functions to process these results further, if necessary.
- Automatically store results in databases like Azure SQL Database or send them to other applications like Microsoft Power BI for reporting.

Notification and Reporting:

- Configure Azure Logic Apps to send notifications to relevant stakeholders with the results of the financial analysis. This can be through emails, push notifications, or even messages in Microsoft Teams.
- Automate the generation of reports using Power BI and distribute them to decision-makers to aid in financial planning and decision-making.

### Step 5: Final Approval and Feedback Loop

1. Final Review and Approval:

   - Set up a stage in Power Automate for final approval from senior management. Include options in the workflow for approval, rejection, or comments.
   - Configure the system to record all decisions and feedback, updating the proposal status accordingly in the CRM or project management tool.

2. Feedback Integration:
   - Ensure that feedback from the approval process can be easily integrated back into the proposal document. Automate the inclusion of comments or required changes back to the drafting team for final adjustments.

### Step 6: Monitoring and Optimization

1. Monitor Workflow Efficiency:

   - Utilize Azure Monitor or a similar tool to track the performance of the automated workflows, measuring metrics such as turnaround time and approval rates.

2. Continuous Improvement:
   - Regularly review the automated processes, seeking feedback from users and analyzing decision data to refine economic thresholds and workflow logic. Adjust the system based on changing business conditions or financial strategies.
