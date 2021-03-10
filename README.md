# Money Manager

Money Manager is a web application that focuses on financial management, investment recommendation, and user interaction. There are three main functionalites to this web application: "Spendings", "Investments" and "Community". 

> **Note:** All "Money Manager" on the header are clickable and will direct you back to the home page.

# Home Page
The home page consists of three big components, one is the general home page that introduces our website, another one is the user log in page and the third one is the user sign up page. 

### General Home Page
This page is used to provide users a general feeling of what our website does, on the top header, it shows the name of the website, Login button and Get started button. Below that is an image slider that shows some website related photo that can visually introduce user what our website does. However, right now, these images are obtained online, it is not the actual images of our websites, this is because we would put those photos on after our website is fully functioning and the website frontend can be furture improved. At the bottom, is the footer for the website which has the obtain of Contact Us and About Us as well as copyright information.

> **Note:** Please see the "Contact Us" and "About Us" section for a more general explanation.

### Sign Up Page
Any button with the name "Get Started" will lead you to the sign up page, where this sign up page is used in the future for actual users to sign up. There are two level of users, one is regular user and one is financial user. The form changes according to the user level. The rest are the general required basic information about the user. If there is a * in the textfield, this indicates those information are required. For the password, it has to be at least 8 characters otherwise it will show the error message. For confirming the password, it will also show error message if the password does not match. After these are done, the user can click "SIGN UP" to sign up, these information will be stored in a database in the future. Then this page will direct you to the Log in page.

### Log In Page
The "Log in" button on the home page will lead you to the log in page where user inputs their username and password. Currently, there are two options of credentials: 1. username and password are both "user", 2. username and password are both "admin". If the credentials are wrong, the user will not be able to log in to the website. If the credentials are correct, the user will be able to redirected to the Spendings page. In the future, these credentials will be verified in the backend. 

> **Note:** Please see the "Spendings" section for a more general explanation.

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

# Community 

### Filter and Sort Posts
The top bar of the thread list has drop-down options to filter and sort posts. 

Currently, there are 3 possible categories of posts to filter by: "Announcement", "Opinion" and "Question". Select a filter and only posts with the cooresponding category label will be displayed. 

The sort post drop-down menu contains 4 options: "Oldes", "Newest", "Most Upvotes" and "Best Rated". Select a sorting order and the posts will be sorted accordingly.

### View Post
To view the full contents of the post, click on the post in the list. This will open a dialog containing all the information about the post. To close the post, click on the "x" button at the top.

### Comment on a Post
Once a post has been opened in a dialog page, comments can be added to the post by simply typing in the text box labeled "Post a Comment:" and pressing the post button. The comment will then be displayed under the existing list of comments.

### Upvote, Downvote and Save Post
To upvote or downvote a post, first open the post by clicking on it in the list, then click the thumb up button or the thumb down button to upvote or downvote. Once a post has been upvoted or downvoted by the user, the cooresponding thumb up or thumb down button will be highlighted in the post list.

To save a post, first open the post, then click the save button on the top right of the page (next to the close button). The post can also be unsaved by clicking on the same button again. 

> **Note:** The saved posts can be accessed in the sidebar menu, which is discussed in "Sidebar Options" below.

### Follow a Financial Advisor through a Post
A post posted by a financial advisor will have a green check mark beside the author name. To follow the financial advisor, first click open the post, and click the "view financial advisor info" button on the top right of the page. This will open a dialog showing some basic information about the financial advisor. Click on the "follow" button to follow the financial advisor. Clicking the button again will unfollow the financial advisor. 

> **Note:** Posts writen by a financial advisor the user is following can be accessed in the sidebar menu, which is discussed in "Sidebar Options" below.

### Add a New Post
To add a new post, go to forum's home page and click the "+" button in the top bar of the forum, this will open a drop-down section. Enter a valid title, category and content for the new post and press the "post" button. This will add the new post to the list of existing posts.

### Manage Posts
To manage posts, go to forum's home page and click the "manage post" button in the top bar of the forum. If the user is a regular user, only their own posts will be displayed. If the user is a financial advisor (admin), all the posts will be displayed. They can then choose to delete posts by clicking the delete button at the right side of the posts. To exit managing posts mode, click on the done button in place of the original "manage post" button.

### Sidebar Options
To open sidebar options, click on the circular "more page options" on the top left of the home forum page. This will open a sidebar with a few options:

1. All Posts: shows all the posts
2. Followed Posts: shows only the posts by financial advisors the user is following
3. Liked Posts: shows only the posts the user has upvoted
4. Saved Posts: shows only the posts the user has saved

Close the sidebar menu by clicking "close" at the top of the side bar

> **Note:** When an option other than "All Posts" is selected, the user cannot add or manage posts
 
# User Profile 
The user profile contains information about the user, and retrieves information from the form they filled when they signed up. On the sidebar, the users will be able to see their general information and being able to edit them. If the user changes the username, their corresponding avatar will also be changed. After they are done editing, they can click "Done". 

On the right side of the profile page is where the users can see their followers, who they are following and also their own posts. In the future, all of these information will be stored in a database and not hardcoded. The Followers button is to show who are the people that is following you. If the user clicks the button, they will be able to see a list of users that are following them and whether the user itself is following the followers. If the user is following, it will show the button of unfollow to give them a choice to unfollow that specific person and vice versa. After the user has finished managing their followers, they can click Done button or anywhere on the screen to close the dialog. This dialog is also draggable. Same thing for the Following button. The post button is disabled as it is only meant to show how many posts the user have posted. 

On the bottom, there is a list of the user's own post. This part of the code is retrieved from the Community Part of the code. The user can also go through their own post and upvote or downvote or post a comment. 

In the end, the users have the options to log out of the website and will be redirected to the home page. If the user wants to exit the profile page, they can simply press any tabs on the header (Spendings, Investments, Community) to leave the profile page.

# Contact Us 
This page is mainly used for those who has questions regarding the website. The request option is not limited to only the ones listed, they can specify their request in the comment box. After they are done filling out this form, they can simply hit "Send" and the request will be sent (this will be done in the future). After they have successfully send their request, they will be prompted with a page of successfully send the request. 

# About Us 
This page contains general information about the developers. 

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
