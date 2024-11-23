# Project Overview
You are building a bill spliting app. The main unique feature of the app you are building will be the use of AI. You will use the best free AI model for reading the bill and converting the items into a UI Table. Using the table the user can add and remove people with whom they need to split the bill with. And then once that is setup the user can update the status for each person whether they have paid the bill or not.

You will build this using NextJS, Drizzle, Zod, Shadcn, Tailwindcss, Lucid Icons.

# Core Functionalities
1. Upload a bill or add items to split manually
    1. The Bill can be uploaded by taking a photo and the AI model will convert the list of items into a json format and we can then map out UI Cards based on that data
    2. For adding the items manually, we can have input fields to specify the name, quantity and price for that item
2. Item list Page
    1. Once the item list has been made either by scanning or manually adding details, the user can then assign other people to that item, or the entire bill 
    2. We can assign people anyhow depending on the items they have consumed. So this functionality needs to be very flexible
3. Pay Page
    1. Once the users are assigned then we can either send a mail or a notification to that user that they owe the amount of money on this bill, the bills can be named or the groups can be made so that we can easily identify the bill info.
    2. The calculations should be based on the items that the user is been based on, for eg if an item is assigned to 2 users then it should be split between them.
4. Final Status Page
    1. A list of all people who have paid yet, amount to be recieved, remaining amount etc