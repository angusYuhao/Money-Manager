# Money Manager

Money Manager is a web application that focuses on financial management, investment recommendation, and user interaction. There are three main functionalites to this web application: "Spendings", "Investments" and "Community". 

# Spendings

### Pie Chart 
The pie chart provides a visual representation to the user's spendings. It will show how much the user has spent in each category in comparison to other categories. If you hover over the sections, it'll also display the total amount of dollars the user spent in that category. 

> **Note:** Please see the "Pie Chart" section for a more general explanation. 

### Transaction History 
The table provides an overview of each individual transaction for the user's spendings. Each entry will contain a "Date", "Amount", "Description" and "Category". 
 
 -- Date: click on the calendar icon to select a date for the transaction, you can also manually type in the date through the input field. If the input is invalid, it will indicate that the date entry is invalid. 
 -- Amount: enter the amount of the spending in the input field, if you try to input anything that is not a number, it will also indicate that the entry is invalid. 
 -- Description: enter the description of the transaction, this can be of any type.
 -- Category: select a category this transaction falls under
 
 For the table in "Spendings", the user can also add a customized category to their transaction history. By clicking on the more icon (three vertical dots), a menu will be brought up. The user can then enter their new category in the "New Category" input and press the add icon to add. If they want to remove a customized category, simply click the category they want to remove. 

> **Note 1:** The default categories (food, personal, transportation, home) cannot be deleted. 

> **Note 2:** Please see the "Table" section for a more general explanation. 

### Spendings By Month
Each month/year is a seperate spendings page. The user can use the sidebar on the left to navigate to their spending history in a specific month/year. To add a new spending page, click the add icon on the top of the side bar and enter all the following information:
-- Month: the month that you want to enter your transactions for 
-- Year: the year you want to enter your transactions for 
-- Projected Spendings: the goal amount you want for your spendings that month

# Investments 
Calculator:
This is a compound interest calculator. It will only consider valid responses(ie. where the initial amount to invest is positive number). If the user enters in invalid data, upon pressing on calculate, the results will show an error message.

General card:
Shows an overview of the user's porfolio. Currently the values are hard coded in. 

Sort button: 
Will sort the stock entries imn the able based on the category selected.

Table:
Currently, it is assumed that all inputted entries are valid and are based on manual entries. Ideally, this information would be from the user's actual investment accounts from say brokers or banks. This is where we will call a database to get data. Each row represents a stock this person purchased, including the number of shares, book cost(which is how much they paid), price(which is the current price), bookCosts(the total amount spent on this stock), gain/loss based on the purchasing price and current price, market value based on the total number of shares' value...etc. These stocks not validated and the entries are hard coded in. It currently only checks for the data type(ie. string or float)

# Community 

# Home Page

# User Profile 

# Contact Us 

# About Us 

# Table 
 The table is used for both the "Spendings" and the "Investments" page. The following are general instructions to handling the table, please see their sections for more specific details on how the table is used in each of the components. 
 
 1. Adding an entry
 To add an entry to the table, one can click the + icon on the upper right corner of the table. This will bring down a row where the user can input data for the corresponding column. When you are done, simply click the checkmark icon to save or the garbage can icon to cancel (there will be a notification on the bottom of the screen if any input field is missing or invalid). 
  
 2. Editing an entry
 To edit an entry in the table, simply hover over the row you want to modify and click the pen icon, this will bring the row into edit mode for any changes to be made. Press the checkmark icon when finished (there will be a notification on the bottom of the screen for a succesful or a failed edit)

 3. Deleting an entry
 To delete an entry in the table, simply hover over the row you want to delete and click the garbage can icon, this will delete the row and the user will be notified on the bottom of the screen. 

 4. Sorting 
 The items in the table can be sorted by different conditions. If the arrow icon beside the condition is an up arrow, this indicates an ascending order. If the arrow icon besides the condition is a down arrow, this indicates a descending order. 

# Pie Chart 
Setup:
    -The width and height of the overall canvas and the radius will be set by the parent component

Calculations:
    -Angles are based  on the ratio of the book cost of the stock/total amount of money spent on investing OR total amount spent on the category/total amount spent
    -The endAngle of one wedge is the starting angle of the other wedge, drawn one by one on the canvas
    -The colours of the wedges are randomly generated
    -Upon any updates to the dom(such as adding/deleting/editing the table), the pie chart will redraw, with new colours

Hover:
    -When you place your cursor over a certain edge, it will show the dollar amount invested in a stock/spent in that category
    -After 0.5s the dollar amount will disappear by repainting that wedge with the saved colour and angles
    -The hover detection is based on the mouse's position relative to the surface area of the wedges(by comparing the angle with respect to the center of the piechart and the absolute distance between the cursor and the center of the pie char)
        -If the angle is within the start and end angles of a wedge and the absolute distance between
         the mouse and the center of the pie is less than the radius, than it will detect this as a hover