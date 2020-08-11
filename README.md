# **Social Finance Digital Labs - Better Children in Care Data Alpha**

## Background

This Alpha project was a cross-council partnership of seven councils led by Greater Manchester Combined Authority and funded by the Local Digital Fund to improve the quality of data on children in care. We supported the delivery of the project with helpful support and feedback from Ministry of Housing, Community and Local Government and the Department for Education. 

## Problem

Children in care are among the most vulnerable groups in our society. Compared to their peers, they are 5 times more likely to be excluded from school, 4 times more likely to be involved with youth justice system and 40 times more likely to become homeless.

Throughout the country, local councils are working hard to close this gap. They are looking for evidence to understand the kind of support that can improve the outcomes of children in care. While local councils do collect data on children in care, they are often not kept in good quality year-round. This diminishes children's services leaders' trust in the data and prevents it from being used to inform strategic and operational decisions related to the support for children in care.  

## Solution

In this Alpha, we prototyped an application that could help local councils identify and resolve errors in their children in care data throughout the year. We focused on a common statutory process (SSDA903) and built the prototype so that users can access it by simply loading a URL in a web browser. There, the application can read data files from their local storage and display results directly. Throughout the process, no data is sent off anywhere and the computer can be disconnected from the internet as the application runs its test locally.

## Alpha Outputs

All outputs from the Alpha phase of the project are available here:

 * [Final User Research Report](./outputs/Final_User_Research_Report.pdf) - This report consolidates all our learning from user research. It outlines the problem we are trying to solve, our research approach and our journey in testing possible solutions with users.
 * [Alpha Prototype](http://lac-poc.s3-website.eu-west-2.amazonaws.com/) - The goal of the Alpha phase was to test the technical setup. With that in mind, we have only implemented two error identification (Error 218 – URN is required and Error 178 – placement provider code is invalid). If you are currently using XMLs or do not have the latest CSV files handy, we have a [header](./outputs/Header_Mock.csv) and an [episodes](./outputs/Episodes_Mock.csv) file with random values that you can test with.      
 * [Business Case](./outputs/Business_Case.xlsx) - This business case quantifies the benefits of implementing the solution we recommended.
 * [Prototype Design](https://www.figma.com/file/tPGzr4NebhFs84QJOqRXzU/Better-Children-in-Care-Application-Design?node-id=271%3A0) - This Figma design shows the user interface of the application. It was created to facilitate testing with local councils in determining the features and display that are helpful for users. 
 * [Prototype Specification](./outputs/Prototype_Specification.xlsx) - This specification document complements the design with more details on the features of the applications. 
 
