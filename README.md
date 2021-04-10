# Money Manager

Money Manager is a web application that focuses on financial management, investment recommendation, and user interaction. There are three main functionalites to this web application: "Spendings", "Investments" and "Community". 

[Check out the website!](https://manage-my-money.herokuapp.com)

> **Note:** All "Money Manager" on the header are clickable and will direct you back to the home page.

# COMPLETE WALKTHROUGH

# 1. Regular User Functionalities

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
The Spendings page now has a toggle button for “Details” and “Overview” mode. The "Details" mode will show the pie chart. The pie chart provides a visual representation to the user's spendings. It will show how much the user has spent in each category in comparison to other categories. If you hover over the sections, it'll also display the total amount of dollars the user spent in that category.

> **Note:** Please see the "Pie Chart" section for a more general explanation. 

### Bar Chart (Phase 2 Functionality)
The Spendings page now has a toggle button for “Details” and “Overview” mode. The “Details” mode will contain the regular information (table and pie chart) as before. The “Overview” mode will now provide a spendings overview of the regular user’s actual and projected spendings throughout the year. As the regular user adds new transactions or months, the bar chart will be automatically updated.

### Transaction History 
The table provides an overview of each individual transaction for the user's spendings. Each entry will contain a "Date", "Amount", "Description" and "Category". 
 
 -- Date: click on the calendar icon to select a date for the transaction, you can also manually type in the date through the input field. If the input is invalid, it will indicate that the date entry is invalid. 
 -- Amount: enter the amount of the spending in the input field, if you try to input anything that is not a number, it will also indicate that the entry is invalid. 
 -- Description: enter the description of the transaction, this can be of any type.
 -- Category: select a category this transaction falls under
 
 For the table in "Spendings", the user can also add a customized category to their transaction history. By clicking on the more icon (three vertical dots), a menu will be brought up. The user can then enter their new category in the "New Category" input and press the add icon to add. If they want to remove a customized category, simply click the category they want to remove. 

> **Note 1:** The default categories (food, personal, transit, home) cannot be deleted. 

> **Note 2:** Please see the "Table" section for a more general explanation. 

### Spendings By Month (Deletion -> Phase 2 Functionality)
Each month/year is a seperate spendings page. The user can use the sidebar on the left to navigate to their spending history in a specific month/year. To add a new spending page, click the add icon on the top of the side bar and enter all the following information:
-- Month: the month that you want to enter your transactions for 
-- Year: the year you want to enter your transactions for 
-- Projected Spendings: the goal amount you want for your spendings that month

To delete a sheet from the month, the user can simply right click on the month and click on the delete button. 

# Investments 

### General card
Shows an overview of the user's porfolio. Currently the values are hard coded in. We will get these information from a database in phase 2.

### Pie Chart
The pie chart at the top of the page shows the overall composition of the user's portfolio based on book costs, the pie chart works similar to the pie chart in the spendings page.

### Bar Chart (Phase 2 Functionality)
Each category represents a stock in the user’s investment portfolio. Within each category, there will be 3 bars showing the book cost, market value, and gain/loss. The bar chart will be automatically updated when the user’s investment portfolio is updated.

### Table
Each row represents a stock this person purchased, including the number of shares, book cost (which is how much they paid), price (which is the current price), bookCosts (the total amount spent on this stock), gain/loss based on the purchasing price and current price, market value based on the total number of shares' value ...etc.

### Live Stock Data (Phase 2 Functionality)
On every buy and sell, the server will get actual stock quotes from Yahoo finance, using the closing price of the day inputted by the user/or the current day
1. Buy:
    - The user will be able to input the date of purchase, name of stock(ticker), quantity(number of stocks)
    - The book cost, gain loss...etc. will be calculated in the server and updated accordingly
2. Sell:
    - The server will use today’s date as the sell date, and update the quantity, book cost...etc. accordingly
    - If the user sells all of his/her shares of a particular stock, the entry will be deleted
    - If the user sells less than all of their shares of a stock, then the stock entry will be updated in the database, as well as the table

Link to live stock npm module: https://www.npmjs.com/package/yahoo-finance
> **Note:** We noticed that this API was slightly inconsistent, our API requests would sometimes not work as expected

### Sort buttons
Will sort the stock entries in the table based on the category selected.

# Community

### Main Sidebar Options
To open sidebar options, click on the circular "more page options" button on the top left of the home forum page. This will open a sidebar with a few options:

1. All Posts: shows all the posts
2. Followed Posts: shows only the posts by financial advisors the user is following
3. Liked Posts: shows only the posts the user has upvoted
4. Saved Posts: shows only the posts the user has saved
5. Inbox: shows the recommendations from Financial Advisors the user is following
6. Advisors List: shows a complete list of Financial Advisors, this is where the user can follow and unfollow financial advisors easily

Close the sidebar menu by clicking "close" at the top of the side bar.

> **Note:** When an option other than "All Posts" is selected, the user cannot add or manage posts.

### All Posts: Filter and Sort Posts
The top bar of the thread list has drop-down options to filter and sort posts. 

Currently, there are 3 possible categories of posts to filter by: "Announcement", "Opinion" and "Question". Select a filter and only posts with the corresponding category label will be displayed. 

The sort post drop-down menu contains 4 options: "Oldest", "Newest", "Most Upvotes" and "Best Rated". Select a sorting order and the posts will be sorted accordingly.

### All Posts: View Post
To view the full contents of the post, click on the post in the list. This will open a dialog containing all the information about the post. To close the post, click on the "x" button at the top.

### All Posts: Comment on a Post
Once a post has been opened in a dialog page, comments can be added to the post by simply typing in the text box labeled "Post a Comment:" and pressing the post button. The comment will then be displayed under the existing list of comments.

### All Posts: Upvote, Downvote and Save Post
To upvote or downvote a post, first open the post by clicking on it in the list, then click the thumb up button or the thumb down button to upvote or downvote. Once a post has been upvoted or downvoted by the user, the corresponding thumb up or thumb down button will be highlighted in the post list.

To save a post, first open the post, then click the save button on the top right of the page (next to the close button). The post can also be unsaved by clicking on the same button again. 

> **Note:** The saved posts can be accessed in the sidebar menu, which is discussed in "Sidebar Options" below.

### All Posts: Follow a Financial Advisor through a Post
A post posted by a financial advisor will have a green check mark beside the author's name. To follow the financial advisor, first click open the post, and click the "view financial advisor info" button on the top right of the page. This will open a dialog showing some basic information about the financial advisor. Note that only financial advisors will have information such as their community points. Click on the "follow" button to follow the financial advisor. Clicking the button again will unfollow the financial advisor. 

> **Note:** Posts writen by a financial advisor the user is following can be accessed in the sidebar menu, which is discussed in "Sidebar Options" below.

### All Posts: Add a New Post
To add a new post, go to forum's home page and click the "+" button in the top bar of the forum, this will open a drop-down section. Enter a valid title, category and content for the new post and press the "post" button. This will add the new post to the list of existing posts.

### All Posts: Manage Posts
To manage posts, go to forum's home page and click the "manage post" button in the top bar of the forum. If the user is a regular user, only their own posts will be displayed. If the user is a financial advisor (admin), all the posts will be displayed. They can then choose to delete posts by clicking the delete button at the right side of the posts. To exit managing posts mode, click on the done button in place of the original "manage post" button.

> **Note:** While regular users can only manage their own posts, a financial advisors can manage/delete all posts. 

### Inbox: Recommendations From Financial Advisors (Phase 2 Functionality)
Once a user follows a financial advisor, the financial advisor is able to send recommendations to the user directly, and this is where the user is able to view them. Click on a list item on the page to see the full content of the recommendation.

### Advisors List: Financial Advisor List (Phase 2 Functionality)
This page is for the regular users to see a list of all available financial advisors and their profiles. The list will contain the name of the financial advisor as well as their number of followers right beside it. By clicking the “Eye” button, they will be able to see details about the specific financial advisor, such as their profile description and what their specialties are. The “Follow” button will allow the regular users to follow this particular financial advisor. The button will turn gray after, indicating the regular user has successfully followed the financial advisor. They can press the same button again to unfollow the financial advisor. 

# Resources (Phase 2 Functionality)
Click on the Resources tab at the top of the page. This page is used to provide regular users with some external resources help. You can get to this page by clicking the “Resources” tab on the top of the app bar. It has three buttons for different views of the external resources (“Finance”, “Investments”, “Calculator”). Each small tab displays three cards that can link to external resources. By clicking on the “learn more” button in each card, it will direct you to the link in a new tab. The “Calculator” tab displays the investment calculator that was originally in the investment page.

### Calculator
This is a compound interest calculator. It will only consider valid inputs (where the initial amount to invest, the interest rate, and the year value are positive numbers). If the user enters in invalid data, upon pressing on calculate, the results will show an error message.

# User Profile

### Side Bar Info (Partly Phase 2 Functionality)
The user profile contains information about the user, and retrieves information from the form they filled when they signed up. On the sidebar, the users will be able to see their general information and will be able to edit them as well. If the user changes the username, their corresponding avatar will also be changed. After they are done editing, they can click "Done". 

### Posts Overview (Phase 2 Functionality)
On the right side of the profile page is where the user can see a snapshot of all the posts they have posted in the community page, as well as their saved posts and posts from financial advisors they are following. The user should be able to like, dislike and comment here as well.

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

### Setup
-- The width and height of the overall canvas and the radius will be set by the parent component

### Calculations
-- Angles are based on the ratio of the book cost of the stock/total amount of money spent on investing OR total amount spent on the category/total amount spent
-- The endAngle of one wedge is the starting angle of the other wedge, drawn one by one on the canvas
--The colours of the wedges are randomly generated
--Upon any updates to the dom(such as adding/deleting/editing the table), the pie chart will redraw, with new colours

### Hover
--When you place your cursor over a certain edge, it will show the dollar amount invested in a stock/spent in that category
 --After 0.5s the dollar amount will disappear by repainting that wedge with the saved colour and angles
  --The hover detection is based on the mouse's position relative to the surface area of the wedges(by comparing the angle with respect to the center of the piechart and the absolute distance between the cursor and the center of the pie chart)
 --If the angle is within the start and end angles of a wedge and the absolute distance between the mouse and the center of the pie is less than the radius, than it will detect this as a hover

 # Views
-- If regular users log in to the website, they will be able to see 3 tabs on the navigation bar: "Spendings", "Investments", "Community", and "Resources". 
-- If financial advisors log in to the website, they will only be able to see the "Community" and "Manage" tabs on the navigation bar, as that is the purpose for them (to provide advice to regular users and to manage posts on the forum) 

# 2. Financial Advisor Functionalities (Admin)

# Home Page
The home page consists of three big components, one is the general home page that introduces our website, another one is the user log in page and the third one is the user sign up page. 

### General Home Page
This page is used to provide users a general feeling of what our website does. On the top header, it shows the name of the website, Login button and Get started button. Below that is an image slider that shows some website related photos that visually introduce user what our website does. However, right now, these images are obtained online, it is not the actual images of our website, this is because we would put those photos on after our website is fully functioning and the website frontend can be further improved. At the bottom is the footer for the website which has the obtain of Contact Us and About Us as well as copyright information.

> **Note:** Please see the "Contact Us" and "About Us" section for a more general explanation.

### Sign Up Page
This part is the same as for regular users, to sign up as a financial advisor, select financial advisor in the drop down menu and enter the relevant information.

### Log In Page
This part is the same as for regular users. When a financial advisor logs in, they will be taken to the community page instead.

> **Note:** As a financial advisor, you will not be able to access pages other than Community, Manage, and your profile page.

### Community
The functionality community features largely stay unchanged for financial advisors, with the exception that a financial advisor is able to delete all other users' posts through the manage posts button.

### Manage (Phase 2 Functionality)
Click the Manage tab on the top bar to view a list of users that are following you. From this page, you will be able to look at the profile information about the people that are following you and send them recommendations. By pressing the “Eye” button, you will be able to see more details about the regular user they have selected. To send a recommendation, the financial advisors can click the “Recommend” button. You can then choose what kind of “action” that they want to recommend (mutual funds, bonds, etf) and also include any additional message in the text section below. The user will then be able receive the message in their “community” page, inside the sidebar with the “Inbox” tab. By clicking on that tab, the user will then be able to see the message sent from the financial advisor.

### User Profile (Phase 2 Functionality)
The left information bar is slightly different for a financial advisor. From here you will be able to edit information such as your Financial Advisor Intro and your fields of expertise. These information will be displayed to all others who view your info.


# ROUTES

### Spendings
Route: GET /spendings/transactions  
Usage: gets the data required for displaying all transactions information on the Spendings page  
Data: userID (from req.session)  
Return: { spendings, categories }  

Route: POST /spendings/categories  
Usage: adds a new user defined category to the database     
Data: userID (from req.session), newCategory (from req.body)  
Return: updatedCategories.spendings_categories  

Route: DELETE /spendings/categories  
Usage: deletes a new user defined category from the database    
Data: userID (from req.session), deleteCategory(from req.body)  
Return: updatedCategories.spendings_categories  

Route: POST /spendings/transaction/:yearIndex/:monthIndex  
Usage: adds a new transaction to a specific year and month sheet   
Data: userID (from req.session), yearIndex (from req.params), monthIndex (from req.params), newTransaction (from req.body)  
Return: { transaction, entire_data, accountBalance }  

Route: PATCH /spendings/transaction/:yearIndex/:monthIndex   
Usage: modifies a transaction from a specific year and month sheet    
Data: userID (from req.session), yearIndex (from req.params), monthIndex (from req.params), editTransaction (from req.body)  
Return: { transaction, entire_data, accountBalance }  

Route: DELETE /spendings/transaction/:yearIndex/:monthIndex  
Usage: deletes a transaction from a specific year and month sheet   
Data: userID (from req.session), yearIndex (from req.params), monthIndex (from req.params), deleteTransaction (from req.body)  
Return: { transaction, entire_data, accountBalance }  

Route: DELETE /spendings/sheet/:yearIndex/:monthIndex  
Usage: deletes a sheet for the spendings  
Data: userID (from req.session), yearIndex (from req.params), monthIndex (from req.params)  
Return: updatedSpendings.spendings  

Route: POST /spendings/sheet  
Usage: adds a new sheet for the spendings, year and month   
Data: userID (from req.session), year (from req.body), month (from req.body), projectedSpendings (from req.body)  
Return: updatedSpendings.spendings  

### Investments
Route: GET /investments/  
Usage: gets the portfolio of the user(all their table entries with the stock name, price, book cost...etc. per entry )  
Data: n/a  
Return: { user.investments }  

Route: POST /investments/  
Usage: add an entry to represent the user buying a specific quantity of a stock on a specific day  
Data: Input: Last Traded Date, Name, Quantity; these are generated in server using yahoo finance and calculations: Price, Average Cost, Market Value, Book Cost, Gain/Loss  
Return: { user.investments }  

Route: DELETE /investments/  
Usage: represents the user selling a specific quantity of a stock today  
Data: Input: stock to sell, quantity to sell; the server will automatically update the stock entry from the user’s investments, or remove the entire entry completely  
Return: { user.investments }  

### Community
Route: GET /community/posts  
Usage: gets the data required for displaying all posts on the Community page  
Data: n/a  
Return: allPosts  

Route: POST /community/posts  
Usage: adds a new post for the user   
Data: {
        postID: req.body.postID,
        authorUsertype: req.body.authorUsertype,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        numUpvotes: req.body.numUpvotes,
        numDownvotes: req.body.numDownvotes,
        time: req.body.time,
        comments: []
    } (from req.body), author (from req.session)  
Return: allPosts  

Route: DELETE /community/posts/:postID  
Usage: deletes a post   
Data: targetPostID (from req.params)  
Return: allPosts  

### Users
Route: GET /users/info  
Usage: gets the user info data  
Data: userID (from req.session)  
Return: { getting every user’s info }  

Route: GET /users/manage  
Usage: route to get all the users that currently follow the FA   
Data: userID (from req.session)   
Return: { const clientObj = new Object()
            clientObj["username"] = follower.username
            clientObj["firstName"] = follower.firstName
            clientObj["lastName"] = follower.lastName
            clientObj["email"] = follower.email
            clientObj["birthday"] = follower.birthday
            clientObj["occupation"] = follower.occupation
            clientObj["salary"] = follower.salary
            clientObj["gender"] = follower.gender
            clientObj["totalSpendings"] = '$5,000'
            clientObj["totalGain"] = '$10,000'
            clientObj["totalLoss"] = '$100'
}  

Route: POST /users/manage/recommend/:targetUsername  
Usage: route for FA to make a recommendation to a regular user  
Data: userID (from req.session)  
Return: { recommendation object }  

Route: POST /users/login  
Usage: route for users to login  
Data: username, password (from frontend input)  
Return: { entire user object }  

Route: GET /users/logout  
Usage: route for users to logout  
Data: destroys sessions  
Return: { nothing }  

Route: POST /users/signup  
Usage: route for users to signup  
Data: entire user object gotten from the frontend input  
Return: { entire user object }  

Route: Patch /users/profile    
Usage: route for users to change their profile page details  
Data: username (from req.session)  
Return: { entire user object (updated profile) }  

Route: GET /users/check-session  
Usage: A route to check if a user is logged in on the session  
Data: userID (from req.session)  
Return: { entire user object }  

Route: POST /profile/userPosts  
Usage: A route to add a post to the user’s profile’s userPosts    
Data: targetUsername (from req.session)  
Return: { saves targetUsers’ post field and send a success code}  

Route: DELETE /profile/userPosts/:postID  
Usage: A route to delete a post from the user’s profile’s userPosts  
Data: targetUsername (from req.session)  
	targetPostID (from req.params.postID)  
Return: { saves targetUser’s post field }  

Route: POST /profile/userSavedPosts  
Usage: A route to add a post to the user’s profile userSavedPosts  
Data: targetUsername (from req.session)  
Return: { saves targetUsers’s userSavedPosts field }  

Route: DELETE /profile/userSavedPosts/:postID  
Usage: A route to delete a post from user’s profile userSavedPosts   
Data:  targetUsername (from req.session)
	targetPostID (from req.params.postID)
Return: { saves targetUsers’s userSavedPosts field }  
 
Route: POST /profile/userUpvotedPosts  
Usage: A route to add a post to the user’s profile userUpvotedPosts  
Data: targetUsername (from req.session)  
Return: { saves targetUser’s userUpVotedPosts field }  

Route: DELETE /profile/userUpvotedPosts/:postID  
Usage: delete a post from user’s profile userUpvotedPosts  
Data: targetUsername (from req.session)
	targetPostID (from req.params.postID)  
Return: { saves targetUser’s userUpVotedPosts field }  
 
Route: POST /profile/userDownvotedPosts  
Usage: add a post to the user’s profile userDownvotedPosts  
Data: targetUsername (from req.session)  
Return: { saves targetUser’s userDownVotedPosts }  

Route: DELETE /profile/userDownvotedPosts/:postID  
Usage: delete a post from user’s profile userDownvotedPosts  
Data: targetUsername (from req.session)
	targetPostID (from req.params.postID)  
Return: { saves targetUser’s userDownVotedPosts field }  

Route: POST /profile/userFollows  
Usage: add a financial advisor to user’s profile userFollows  
Data: targetUsername (from req.session)
	targetFAUsername (from req.params.FAusername)  
Return: { saves targetUser’s userFollows field }  

Route: DELETE /profile/userFollows/:FAusername  
Usage: delete a financial advisor to user’s profile userFollows  
Data: targetUsername (from req.session)
	targetFAUsername (from req.params.FAusername)  
Return: { saves targetUser’s userFollows field }  

Route: POST /profile/FAInfo  
Usage: add FAInfo into the FA database  
Data: newFAInfo = {
       FAFirstname: req.body.FAFirstname,
        FALastname: req.body.FALastname,
        FAIntro: req.body.FAIntro,
        FAFields: req.body.FAFields,
        FAPoints: req.body.FAPoints
}  
Return: { saves newFAInfo to the database }  

Route: GET /profile/FAInfo  
Usage: get list of all FAInfo  
Data: allFAInfo  
Return: { allFAInfo }  

Route: PATCH /profile/FAInfo/  
Usage: change FAInfo    
Data: pathObj: {
	username: this.state.username,
      	op: "replace",
      	path: "/" + "FAFields",
      	value: this.state.FAFields}   
Return: { updateFAInfo }

# Resources We Used
We used Material-UI and yahoo finance live stock API (mentioned in the live stock section in Investments) 
