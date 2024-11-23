# Bill Splitting App - Product Requirements Document

## Project Overview

This project involves developing a bill-splitting app with AI integration to simplify the process of digitizing a physical bill and splitting it among a group. The application will allow users to upload bills, split items or total amounts flexibly among individuals, and track payment statuses.

## Tech Stack

- **Framework**: Next.js
- **Database**: Drizzle
- **Validation**: Zod
- **UI Components**: Shadcn
- **Styling**: TailwindCSS
- **Icons**: Lucid Icons

## Core Functionalities

### 1. Upload Bill or Add Items Manually

#### Functionality Details

**Upload Bill:**

- Users can upload an image of a bill
- The image will be processed using an AI model to extract data (e.g., items, quantities, prices) and convert it into a JSON format
- JSON data will render a UI Table with editable rows for further adjustments

**Add Items Manually:**

- Users can manually add items via input fields for item name, quantity, and price
- Fields will validate for empty values or invalid input using Zod

#### UI Requirements

- Drag-and-drop or button-based file upload interface
- Form with dynamically generated input rows for manual addition

#### Key Edge Cases

- Ensure invalid or incomplete bills are flagged for user review
- Handle poor image quality gracefully by suggesting manual input

### 2. Item List Page

#### Functionality Details

- Display an editable table of items extracted or manually added
- Allow assigning individuals to specific items or the entire bill
- Flexible functionality to assign individuals item-wise or split the entire bill equally among participants

#### UI Requirements

- Interactive table UI with the following columns:
  - Item Name
  - Quantity
  - Price
  - Assigned Individuals
- Modal or dropdown for adding/removing individuals

#### Key Edge Cases

- Ensure proper recalculations when assignments change
- Prevent double-counting or incorrect assignments

### 3. Pay Page

#### Functionality Details

- Users can view payment details, including the assigned amount for each individual
- Send notifications (via email or in-app) to individuals detailing their dues
- Support custom bill/group naming for easy identification
- Calculation logic should:
  - Split item price proportionally among assigned users
  - Factor any discounts or taxes into the total before splitting

#### UI Requirements

- Summary table showing:
  - Participant Name
  - Assigned Items
  - Total Amount Owed
- Action buttons for sending payment reminders

#### Key Edge Cases

- Ensure notifications are not sent multiple times by mistake
- Handle cases where a user declines to accept payment responsibility

### 4. Final Status Page

#### Functionality Details

- Consolidated status page showing:
  - Individuals who have paid
  - Outstanding amounts for each individual
  - Total amount received and remaining

#### UI Requirements

- Status table with the following columns:
  - Participant Name
  - Amount Paid
  - Amount Due
- Visual indicators (e.g., green for paid, red for unpaid)

#### Key Edge Cases

- Handle cases of partial payments
- Provide mechanisms for manually marking payments as complete in case of external transactions

## Project Structure

```
/src
  /components
    - FileUpload.tsx         // Component for uploading bills
    - ItemTable.tsx          // Editable item table
    - PaymentSummary.tsx     // Summary component for payment details
    - StatusTable.tsx        // Final status table
  /pages
    - index.tsx              // Landing page
    - item-list.tsx          // Item List page
    - pay.tsx                // Payment summary page
    - status.tsx             // Final status page
  /utils
    - aiProcessor.ts         // Logic for AI model integration
    - calculationUtils.ts    // Helper functions for payment calculations
  /styles
    - globals.css           // TailwindCSS configurations
  /services
    - emailService.ts       // Logic for email notifications
    - db.ts                 // Drizzle database instance and schema
  /types
    - item.ts              // Type definitions for items and participants
```

## Low-Level Documentation

### Components Documentation

#### FileUpload

- Accepts images via drag-and-drop or upload button
- Converts images to JSON via aiProcessor
- Emits JSON data for further processing

#### ItemTable

- Editable table to view and manage items
- Accepts JSON or manual input and updates state on changes

#### PaymentSummary

- Displays total payable amounts per participant
- Provides notification triggers for due amounts

#### StatusTable

- Displays a summary of payment statuses
- Offers a manual override for marking payments complete

### Utilities Documentation

#### aiProcessor

- Handles AI model integration for bill parsing
- Ensures data consistency and validation

#### calculationUtils

- Includes functions for splitting item costs, calculating totals, and tax distribution
