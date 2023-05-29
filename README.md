# COEN6311 Project : Team GGWP
## Authors: 
Dinesh Kini Bailoor(40231799)
<br>Jimi Mehta(40225526) 
<br>Sraddha Bhattacharjee(40221370) 
<br>Saketh Oppula(40221013)
<br> Sultan Singh(40235080)

## Website: https://travel-package-management.herokuapp.com/
### Agent Login: aliceagent@gmail.com/ alice123
### Customer Login: customer@gmail.com/ customer123

## User stories and estimates


#### Epic 1: Package Management
| User Story                                                                                                        | Tasks                                                                    | Estimate | Priority | Status        |
|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|----------|----------|---------------|
| As a customer, I want to browse available travel packages, so that I can choose one that suits my preferences     | Implement search functionality for browsing travel packages               | 5 days   | High     | In Progress   |
|                                                                                                                   | Develop user-friendly interface to display package information              | 3 days   | High     | In Progress   |
| As a customer, I want to search for specific travel packages based on criteria such as destination, duration, or price range | Design and implement search feature with filtering options            | 4 days   | High     | In Progress   |
|                                                                                                                   | Develop sorting mechanism for search results                                | 2 days   | Medium   | In Progress   |
| As an agent, I want to create new travel packages, specifying the included flights, hotels, and activities        | Design agent interface for creating new travel packages                     | 4 days   | High     | In Progress   |
|                                                                                                                   | Implement functionality to save and store created packages                  | 3 days   | High     | In Progress   |
| As an agent, I want to modify existing travel packages, such as updating the prices, adding, or removing components, or changing package details | Develop interface for modifying existing travel packages             | 5 days   | Medium   | In Progress   |
|                                                                                                                   | Implement version control or history tracking for changes                    | 3 days   | Medium   | In Progress   |


#### Epic 2: Booking Management

| User Story                                                                                                        | Task                                                                       | Estimate | Priority | Status  |
|-------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|----------|----------|---------|
| As a customer, I want to create a booking by selecting a travel package, so that I can secure my reservation.     | - Implement booking process for customers selecting a travel package       | 6 days   | High     | Sprint 1 |
|                                                                                                                   | - Develop secure reservation system                                         | 4 days   | High     | Sprint 1 |
| As a customer, I want to modify or cancel my booking if my plans change, ensuring flexibility.                   | - Design and implement booking modification functionality                  | 4 days   | Medium   | Sprint 1 |
|                                                                                                                   | - Develop cancellation process for customers                                | 3 days   | Medium   | Sprint 1 |
| As an agent, I want to view and manage customer bookings, including modifying or canceling them as requested.     | - Create interface to view and manage customer bookings                     | 5 days   | High     | Sprint 1 |
|                                                                                                                   | - Implement modification and cancellation functionality                    | 4 days   | High     | Sprint 1 |
| As an agent, I want to generate booking reports to track the number of bookings, revenue, and other metrics.      | - Design and implement booking report generation                           | 5 days   | Medium   | Sprint 1 |
|                                                                                                                   | - Include tracking of bookings, revenue, and other metrics                  | 3 days   | Medium   | Sprint 1 |



#### Epic 3: Agent Management

| User Story                                                                                                        | Task                                                                       | Estimate | Priority | Status  |
|-------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|----------|----------|---------|
| As an agent, I want to create and manage agent accounts, ensuring authorized access to the system.                | - Design and implement agent account creation functionality                  | 4 days   | High     | Planned |
|                                                                                                                   | - Develop agent account management system                                   | 5 days   | High     | Planned |
| As an agent, I want to view reports on bookings and revenue, allowing me to monitor business performance.        | - Design reporting system for bookings and revenue                           | 4 days   | High     | Planned |
|                                                                                                                   | - Implement reporting functionality for bookings and revenue                 | 3 days   | High     | Planned |
| As an agent, I want to receive notifications about new bookings, cancellations, or other relevant updates.      | - Set up notification system for new bookings and updates                    | 3 days   | Medium   | Planned |
|                                                                                                                   | - Develop notification handling and delivery mechanism                      | 4 days   | Medium   | Planned |
| As an agent, I want to manage customer accounts, including updating personal information or handling account-related requests. | - Design customer account management interface                   | 5 days   | High     | Planned |
|                                                                                                                   | - Implement functionality for updating customer information and requests    | 4 days   | High     | Planned |


#### Epic 4: Custom Package Creation

| User Story                                                                                                        | Task                                                                       | Estimate | Priority | Status  |
|-------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|----------|----------|---------|
| As a customer, I want to create a custom travel package by selecting individual components (flights, hotels, activities), allowing for personalized experiences. | - Design and implement selection interface for flights, hotels, and activities | 6 days   | High     | Planned |
|                                                                                                                   | - Develop functionality to store selected components for a custom package    | 5 days   | High     | Planned |
| As a customer, I want to view the total cost of my custom package, including the prices of selected components and any additional fees. | - Calculate and display the total cost of the custom package                | 3 days   | Medium   | Planned |
|                                                                                                                   | - Include any additional fees in the calculation of the total cost          | 2 days   | Medium   | Planned |
| As an agent, I want to store and manage custom packages created by customers, ensuring their availability for booking. | - Design database structure for storing custom packages                      | 4 days   | High     | Planned |
|                                                                                                                   | - Implement functionality to add, update, and delete custom packages         | 5 days   | High     | Planned |


#### Epic 5: Payment Processing

| User Story                                                                                                                               | Task                                                                             | Estimate | Priority | Status  |
|------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|----------|----------|---------|
| As a customer, I want to securely submit my payment information to complete the booking process.                                        | - Implement secure payment form for customers to submit payment information       | 4 days   | High     | Planned |
|                                                                                                                                          | - Set up encryption and data protection measures for handling payment information | 3 days   | High     | Planned |
| As a customer, I want to receive a confirmation of my payment and booking once the transaction is successfully processed.                | - Develop functionality to send booking confirmation emails to customers          | 2 days   | Medium   | Planned |
|                                                                                                                                          | - Include payment confirmation details in the confirmation email                | 1 day    | Medium   | Planned |
| As an agent, I want to integrate a payment processing API (e.g., STRIPE) to handle customer payments securely and efficiently.             | - Research and select a suitable payment processing API                          | 2 days   | High     | Planned |
|                                                                                                                                          | - Implement integration with the chosen payment processing API                   | 4 days   | High     | Planned |


#### Epic 6: User Account Management

| User Story                                                                                                                              | Task                                                                              | Estimate | Priority | Status  |
|-----------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|--------|----------|---------|
| As a customer, I want to create a user account to access personalized features and manage my bookings.                                | - Design and implement user account creation functionality                         | 3 days | High     | Planned |
|                                                                                                                                         | - Develop secure user account registration process                                | 2 days | High     | Planned |
| As a customer, I want to view and modify my account information, such as contact details or preferences.                              | - Design user interface for viewing and modifying account information              | 3 days | Medium   | Planned |
|                                                                                                                                         | - Implement functionality to update account information                            | 2 days | Medium   | Planned |
| As an agent, I want to manage agent accounts, including granting or revoking access privileges.                                       | - Design interface for managing agent accounts                                     | 3 days | High     | Planned |
|                                                                                                                                         | - Implement functionality to grant or revoke access privileges for agent accounts | 2 days | High     | Planned |
| As an agent, I want to implement security measures (e.g., password hashing, authentication) to protect user accounts from unauthorized access. | - Implement password hashing and storage mechanism                               | 3 days | High     | Planned |
|                                                                                                                                         | - Develop authentication system for user account login                            | 4 days | High     | Planned |


