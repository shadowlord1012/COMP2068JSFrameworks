                            Inventory Management System

    Overview
--------------------------------------------------------------------------------------------------
This inventory management system is a prototype of what could become a usable application in 
certian real world scenario's. Its meant to bridge the gap of always having to search out multiple
difference hand made systems that would increase labour costs. The system integrates an accounting 
warning system via table colouring for more of a user friend feel.
                    
Part 1: Projects
--------------------------------------------------------------------------------------------------
The projects tab controls the basic information that is need for the entire application to work.
Within the page, a user will be able to create update or delete projects within the 
Application. Once a project is made and a user progresses to the next page Accounting. the 
information that was entered within the database table will be carried over to the accounting 
table. When updating a project the user can only change certian values of that porject without
deleting the entire entry from the table. 

Part 2: Accounting
--------------------------------------------------------------------------------------------------
The Accounting page is where some of the magic happens. Within here a user will be able to add 
materials to whichever project it needs whether it be a single material like a 2x4 or a whole
kitchen kit which includes cabinets and hardware. It also has a built in warning system that 
reflects based on how much of the budget that was set in the project page is left. The Closer it 
gets to a predetermined amount the table will reflect the changes. From here a User will be able
to set up a delivery schedules that are project related by the ID that was giving when first 
created.

Part 3: Deliveries
--------------------------------------------------------------------------------------------------
The deliveries page is a very basic setup where a user will be able to add in a delivery id, 
create a date in which it will be deliveried, and which project it relates to. Then can go back to
the accounting page to add in materials that are to be deliveried with that id. The Delivery page
also has a intergrated Map function that allows the user to get a rough location in where the 
delivery is to happen. NOTE: I spent a very long time trying to find a free Geolocation API with 
no such luck. So i have reused my Weather API that will get the values that are need. Since the 
Map works off of a long and lat coordinates the weather API will get me the values based off the
city name, Not the street number. Google Map API does have this ability but I was not wanting to 
pay the outragous prices they wanted. 

Part # 4: Materials
--------------------------------------------------------------------------------------------------
The Materials page will display any and all materials that where added to deliveries for every 
project. As the same as the project page, only set values can be updated after the material has 
been set in the table. Any Material can be placed with any project and it will only give you the 
deliveries that are retained to that project.