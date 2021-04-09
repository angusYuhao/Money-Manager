# team06
# Money Manager

Money Manager is a web application that focuses on financial management, investment recommendation, and user interaction. There are three main functionalites to this web application: "Spendings", "Investments" and "Community". 

> **Note:** All "Money Manager" on the header are clickable and will direct you back to the home page.

# Phase 2
# New features 

# BarChart

# Resources Page

# Manage Page

# Financial Advisor List



# Phase 1
# Home Page
The home page consists of three big components, one is the general home page that introduces our website, another one is the user log in page and the third one is the user sign up page. 

### General Home Page
This page is used to provide users a general feeling of what our website does. On the top header, it shows the name of the website, Login button and Get started button. Below that is an image slider that shows some website related photos that visually introduce user what our website does. However, right now, these images are obtained online, it is not the actual images of our website, this is because we would put those photos on after our website is fully functioning and the website frontend can be further improved. At the bottom is the footer for the website which has the obtain of Contact Us and About Us as well as copyright information.

> **Note:** Please see the "Contact Us" and "About Us" section for a more general explanation.

### Sign Up Page
Any button with the name "Get Started" will lead you to the sign up page, where this sign up page is used in the future for actual users to sign up. There are two level of users, one is regular user and one is financial user. The sign up form changes according to the user level. For financial advisors, they would need an "Admin passcode" in order to successfully sign up. The rest are the general required basic information about the user. If there is a * in the textfield, this indicates those information are required. For the password, it has to be at least 8 characters otherwise it will show the error message. For confirming the password, it will also show error message if the passwords do not match. After these are done, the user can click "SIGN UP" to sign up, these information will be stored in a database in the future. Then this page will direct you to the Log in page. One can also click on the "Back to Home" button on the top right corner to return back to the home page. 

### Log In Page
The "Log in" button on the home page will lead you to the log in page where the user can input their username and password. Currently, there are two options of credentials: 1. username and password are both "user" (for regular users), 2. username and password are both "admin" (for financial advisors). If the credentials are wrong, the user will not be able to log in to the website and will be redirected back to the login page. If the credentials are correct, the user will be redirected to the Spendings page (for regular users) or the Community page (for financial advisors). In the future, these credentials will be verified in the backend. 

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

> **Note 1:** The default categories (food, personal, transit, home) cannot be deleted. 

> **Note 2:** Please see the "Table" section for a more general explanation. 

### Spendings By Month
Each month/year is a seperate spendings page. The user can use the sidebar on the left to navigate to their spending history in a specific month/year. To add a new spending page, click the add icon on the top of the side bar and enter all the following information:
-- Month: the month that you want to enter your transactions for 
-- Year: the year you want to enter your transactions for 
-- Projected Spendings: the goal amount you want for your spendings that month

# Investments 
Calculator:
This is a compound interest calculator. It will only consider valid inputs (where the initial amount to invest, the interest rate, and the year value are positive numbers). If the user enters in invalid data, upon pressing on calculate, the results will show an error message.

General card:
Shows an overview of the user's porfolio. Currently the values are hard coded in. We will get these information from a database in phase 2.

Sort button: 
Will sort the stock entries in the table based on the category selected.

Table:
Currently, it is assumed that all inputted entries are based on manual entries. Ideally, this information would be from the user's actual investment accounts from say brokers or banks. This is where we will call a database to get data. Each row represents a stock this person purchased, including the number of shares, book cost (which is how much they paid), price (which is the current price), bookCosts (the total amount spent on this stock), gain/loss based on the purchasing price and current price, market value based on the total number of shares' value ...etc. These stocks are not validated and the entries are hard coded in. It currently only checks for the data type (ie. quantity should be a positive number, prices should not be string, etc.)

# Community 

### Filter and Sort Posts
The top bar of the thread list has drop-down options to filter and sort posts. 

Currently, there are 3 possible categories of posts to filter by: "Announcement", "Opinion" and "Question". Select a filter and only posts with the corresponding category label will be displayed. 

The sort post drop-down menu contains 4 options: "Oldest", "Newest", "Most Upvotes" and "Best Rated". Select a sorting order and the posts will be sorted accordingly.

### View Post
To view the full contents of the post, click on the post in the list. This will open a dialog containing all the information about the post. To close the post, click on the "x" button at the top.

### Comment on a Post
Once a post has been opened in a dialog page, comments can be added to the post by simply typing in the text box labeled "Post a Comment:" and pressing the post button. The comment will then be displayed under the existing list of comments.

### Upvote, Downvote and Save Post
To upvote or downvote a post, first open the post by clicking on it in the list, then click the thumb up button or the thumb down button to upvote or downvote. Once a post has been upvoted or downvoted by the user, the corresponding thumb up or thumb down button will be highlighted in the post list.

To save a post, first open the post, then click the save button on the top right of the page (next to the close button). The post can also be unsaved by clicking on the same button again. 

> **Note:** The saved posts can be accessed in the sidebar menu, which is discussed in "Sidebar Options" below.

### Follow a Financial Advisor through a Post
A post posted by a financial advisor will have a green check mark beside the author's name. To follow the financial advisor, first click open the post, and click the "view financial advisor info" button on the top right of the page. This will open a dialog showing some basic information about the financial advisor. Note that only financial advisors will have information such as their community points. Click on the "follow" button to follow the financial advisor. Clicking the button again will unfollow the financial advisor. 

> **Note:** Posts writen by a financial advisor the user is following can be accessed in the sidebar menu, which is discussed in "Sidebar Options" below.

### Add a New Post
To add a new post, go to forum's home page and click the "+" button in the top bar of the forum, this will open a drop-down section. Enter a valid title, category and content for the new post and press the "post" button. This will add the new post to the list of existing posts.

### Manage Posts
To manage posts, go to forum's home page and click the "manage post" button in the top bar of the forum. If the user is a regular user, only their own posts will be displayed. If the user is a financial advisor (admin), all the posts will be displayed. They can then choose to delete posts by clicking the delete button at the right side of the posts. To exit managing posts mode, click on the done button in place of the original "manage post" button.

> **Note:** While regular users can only manage their own posts, a financial advisors can manage/delete all posts. 

### Sidebar Options
To open sidebar options, click on the circular "more page options" button on the top left of the home forum page. This will open a sidebar with a few options:

1. All Posts: shows all the posts
2. Followed Posts: shows only the posts by financial advisors the user is following
3. Liked Posts: shows only the posts the user has upvoted
4. Saved Posts: shows only the posts the user has saved

Close the sidebar menu by clicking "close" at the top of the side bar.

> **Note:** When an option other than "All Posts" is selected, the user cannot add or manage posts.
 
# User Profile 
The user profile contains information about the user, and retrieves information from the form they filled when they signed up. On the sidebar, the users will be able to see their general information and will be able to edit them as well. If the user changes the username, their corresponding avatar will also be changed. After they are done editing, they can click "Done". 

On the right side of the profile page is where the users can see their followers, who they are following and also their own posts. In the future, all of these information will be stored in a database and not hardcoded. The Followers button is to show the people that are following you. If the user clicks the button, they will be able to see a list of users that are following them and whether the user themselves are following the followers. If the user is following, it will show the "unfollow" button to give them a choice to unfollow that specific person and vice versa. After the user has finished managing their followers, they can click Done button or anywhere on the screen to close the dialog. This dialog is also draggable. Same thing for the Following button. The post button is disabled as it is only meant to show how many posts the user have posted. 

On the bottom, there is a list of the user's own posts. This part of the code is retrieved from the "Community" code. The user can also go through their own post and upvote or downvote or post a comment. 

In the end, the users have the options to log out of the website and will be redirected to the home page. If the user wants to exit the profile page, they can simply press any tabs on the header (Spendings, Investments, Community) to leave the profile page.

# Contact Us 
This page is mainly used for those who have questions regarding the website. The request option is not limited to only the ones listed, they can specify their request in the comment box. After they are done filling out this form, they can simply hit "Send" and the request will be sent (this will be done in the future). After they have successfully send their request, they will be prompted with a page of successfully send the request. 

# About Us 
This page contains general information about the developers and the website. 

# Table 
 The table is used for both the "Spendings" and the "Investments" page. The following are general instructions to handling the table, please see their sections for more specific details on how the table is being used in each of the components. 
 
 1. Adding an entry
 To add an entry to the table, one can click the "+" icon on the upper right corner of the table. This will bring down a row where the user can input data for the corresponding column. When the user is done, simply click the checkmark icon to save. The user can also click the trash icon to cancel (there will be a notification on the bottom of the screen if any input field is missing or invalid). 
  
 2. Editing an entry
 To edit an entry in the table, simply hover over the row you want to modify and click the pen icon, this will bring the row into edit mode for any changes to be made. Press the checkmark icon when finished (there will be a notification on the bottom of the screen for a succesful or a failed edit)

 3. Deleting an entry
 To delete an entry in the table, simply hover over the row you want to delete and click the trash icon, this will delete the row and the user will be notified on the bottom of the screen. 

 4. Sorting 
 The items in the table can be sorted by different conditions. If the arrow icon beside the condition is an up arrow, this indicates an ascending order. If the arrow icon besides the condition is a down arrow, this indicates a descending order. 

# Pie Chart 
### Setup:
-- The width and height of the overall canvas and the radius will be set by the parent component

### Calculations:
-- Angles are based on the ratio of the book cost of the stock/total amount of money spent on investing OR total amount spent on the category/total amount spent
-- The endAngle of one wedge is the starting angle of the other wedge, drawn one by one on the canvas
--The colours of the wedges are randomly generated
--Upon any updates to the dom(such as adding/deleting/editing the table), the pie chart will redraw, with new colours

### Hover:
--When you place your cursor over a certain edge, it will show the dollar amount invested in a stock/spent in that category
 --After 0.5s the dollar amount will disappear by repainting that wedge with the saved colour and angles
  --The hover detection is based on the mouse's position relative to the surface area of the wedges(by comparing the angle with respect to the center of the piechart and the absolute distance between the cursor and the center of the pie chart)
 --If the angle is within the start and end angles of a wedge and the absolute distance between the mouse and the center of the pie is less than the radius, than it will detect this as a hover

 # Views:
-- If regular users log in to the website, they will be able to see 3 tabs on the navigation bar: "Spendings", "Investments", and "Community". 
-- If financial advisors log in to the website, they will only be able to see the "Community" tab on the navigation bar, as that is the purpose for them (to provide advice to regular users and to manage posts on the forum) 

# Use of Third Party Libraries:
-- For the project, we used Material UI and React.
