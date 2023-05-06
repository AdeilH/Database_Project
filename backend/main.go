package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Address struct {
	Line1   string `json:"line1"`
	Line2   string `json:"line2"`
	City    string `json:"city"`
	State   string `json:"state"`
	ZipCode string `json:"zipCode"`
	Phone   string `json:"phone"`
}

type RegistrationForm struct {
	Email     string  `json:"email"`
	Password  string  `json:"password"`
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Address   Address `json:"address"`
}

type PaymentMethod struct {
	ID            int    `json:"id"`
	PaymentMethod string `json:"paymentMethod"`
}

type Service struct {
	ID      int    `json:"id"`
	Service string `json:"service"`
}

type ServiceProvider struct {
	ID        int    `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	ServiceID int    `json:"serviceId"`
	Service   string `json:"service"`
}

type Order struct {
	OrderID      int     `json:"order_id"`
	CustomerID   int     `json:"customer_id"`
	ProviderID   int     `json:"provider_id"`
	PaymentID    int     `json:"payment_id"`
	TotalPayment float64 `json:"total_payment"`
	Discount     float64 `json:"discount"`
}

type OrderDetails struct {
	OrderID       int     `json:"order_id"`
	CustomerEmail string  `json:"customer_email"`
	ProviderName  string  `json:"provider_name"`
	MethodName    string  `json:"method_name"`
	TotalPayment  float64 `json:"total_payment"`
	Discount      float64 `json:"discount"`
}

func main() {
	router := gin.Default()
	router.POST("/api/register", registerHandler)
	router.GET("/api/services", getServicesHandler)
	router.GET("/api/paymentmethods", getPaymentMethodsHandler)
	router.POST("/api/placeorder", placeOrderHandler)
	router.GET("/api/serviceproviders", getServiceProvidersHandler)
	router.POST("/api/registerServiceProvider", registerServiceProviderHandler)
	router.POST("/api/login", loginHandler) // Add this line for the login endpoint
	router.GET("/api/orderdetails", getOrderDetailsHandler)
	router.Run(":8080")
}

func registerHandler(c *gin.Context) {
	var form RegistrationForm
	if err := c.BindJSON(&form); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// open database connection
	db, err := sql.Open("mysql", "root:qwer1234@tcp(localhost:3306)/HomeServices")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer db.Close()

	// insert into customers table
	customerInsertQuery := "INSERT INTO Customers (email_address, password, first_name, last_name) VALUES (?, ?, ?, ?)"
	result, err := db.Exec(customerInsertQuery, form.Email, form.Password, form.FirstName, form.LastName)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	customerID, err := result.LastInsertId()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// insert into addresses table
	addressInsertQuery := "INSERT INTO Addresses (customer_id, line1, line2, city, state, zip_code, phone) VALUES (?, ?, ?, ?, ?, ?, ?)"
	_, err = db.Exec(addressInsertQuery, customerID, form.Address.Line1, form.Address.Line2, form.Address.City, form.Address.State, form.Address.ZipCode, form.Address.Phone)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	addressID, err := result.LastInsertId()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	updateCustomerQuery := "UPDATE Customers SET address_id = ? where customer_id = ?"

	_, err = db.Exec(updateCustomerQuery, addressID, customerID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Registration successful"})
}

func getServicesHandler(c *gin.Context) {
	// open database connection
	db, err := sql.Open("mysql", "root:qwer1234@tcp(localhost:3306)/HomeServices")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer db.Close()

	// query services from services table
	query := "SELECT * FROM Services"
	rows, err := db.Query(query)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	services := []Service{}
	for rows.Next() {
		var service Service
		if err := rows.Scan(&service.ID, &service.Service); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		services = append(services, service)
	}

	c.JSON(http.StatusOK, services)
}

func registerServiceProviderHandler(c *gin.Context) {
	var serviceProviderData struct {
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		Email     string `json:"email"`
		Service   string `json:"serviceName"`
	}

	if err := c.BindJSON(&serviceProviderData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Open database connection
	db, err := sql.Open("mysql", "root:qwer1234@tcp(localhost:3306)/HomeServices")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer db.Close()

	// Fetch the service ID based on the service name
	var serviceID int
	err = db.QueryRow("SELECT services_id FROM Services WHERE service = ?", serviceProviderData.Service).Scan(&serviceID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid service"})
		return
	}

	// Insert into the service providers table
	insertQuery := "INSERT INTO ServiceProviders (first_name, last_name, service_id, email_address) VALUES (?, ?, ?, ?)"
	result, err := db.Exec(insertQuery, serviceProviderData.FirstName, serviceProviderData.LastName, serviceID, serviceProviderData.Email)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	providerID, err := result.LastInsertId()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	serviceProvider := ServiceProvider{
		ID:        int(providerID),
		FirstName: serviceProviderData.FirstName,
		LastName:  serviceProviderData.LastName,
		Email:     serviceProviderData.Email,
		ServiceID: serviceID,
		Service:   serviceProviderData.Service,
	}

	c.JSON(http.StatusOK, serviceProvider)
}

func getPaymentMethodsHandler(c *gin.Context) {
	// open database connection
	db, err := sql.Open("mysql", "root:qwer1234@tcp(localhost:3306)/HomeServices")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer db.Close()

	// query payment methods from PaymentMethods table
	query := "SELECT * FROM PaymentMethods"
	rows, err := db.Query(query)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	paymentMethods := []PaymentMethod{}
	for rows.Next() {
		var paymentMethod PaymentMethod
		if err := rows.Scan(&paymentMethod.ID, &paymentMethod.PaymentMethod); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		paymentMethods = append(paymentMethods, paymentMethod)
	}

	c.JSON(http.StatusOK, paymentMethods)
}

func loginHandler(c *gin.Context) {
	type LoginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var req LoginRequest
	if err := c.BindJSON(&req); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// open database connection
	db, err := sql.Open("mysql", "root:qwer1234@tcp(localhost:3306)/HomeServices")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer db.Close()

	// query customer with the provided email and password
	query := "SELECT customer_id FROM Customers WHERE email_address = ? AND password = ?"
	row := db.QueryRow(query, req.Email, req.Password)

	var customerID int
	if err := row.Scan(&customerID); err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"customerID": customerID, "message": "Login successful"})
}

func placeOrderHandler(c *gin.Context) {
	fmt.Println("PlaceOrderHandler Called")
	var orderData struct {
		CustomerEmail string  `json:"customer_email"`
		ProviderEmail string  `json:"provider_email"`
		MethodName    string  `json:"method_name"`
		TotalPayment  float64 `json:"total_payment"`
		Discount      float64 `json:"discount"`
	}

	if err := c.BindJSON(&orderData); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db, err := sql.Open("mysql", "root:qwer1234@tcp(localhost:3306)/HomeServices")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer db.Close()

	tx, err := db.Begin()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("aasd")
	// Get customer ID based on the provided email
	var customerID int
	err = db.QueryRow("SELECT customer_id FROM Customers WHERE email_address = ?", orderData.CustomerEmail).Scan(&customerID)
	if err != nil {
		tx.Rollback()
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid customer email"})
		return
	}
	fmt.Println(customerID)
	// Get provider ID based on the provided email
	var providerID int
	err = db.QueryRow("SELECT provider_id FROM ServiceProviders WHERE email_address = ?", orderData.ProviderEmail).Scan(&providerID)
	if err != nil {
		tx.Rollback()
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid provider email"})
		return
	}
	fmt.Println(providerID)
	var methodID int
	err = db.QueryRow("SELECT method_id FROM PaymentMethods WHERE payment_method = ?", orderData.MethodName).Scan(&methodID)
	if err != nil {
		tx.Rollback()
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid payment method"})
		return
	}

	insertPaymentQuery := "INSERT INTO Payments (method_id, totalPayment, Discount, customer_id) VALUES (?, ?, ?, ?)"
	result, err := tx.Exec(insertPaymentQuery, methodID, orderData.TotalPayment, orderData.Discount, customerID)
	if err != nil {
		tx.Rollback()
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	paymentID, err := result.LastInsertId()
	if err != nil {
		tx.Rollback()
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	insertOrderQuery := "INSERT INTO Orders (customer_id, provider_id, payment_id) VALUES (?, ?, ?)"
	result, err = tx.Exec(insertOrderQuery, customerID, providerID, paymentID)
	if err != nil {
		tx.Rollback()
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	orderID, err := result.LastInsertId()
	if err != nil {
		tx.Rollback()
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = tx.Commit()
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	order := Order{
		OrderID:      int(orderID),
		CustomerID:   customerID,
		ProviderID:   providerID,
		PaymentID:    int(paymentID),
		TotalPayment: orderData.TotalPayment,
		Discount:     orderData.Discount,
	}

	c.JSON(http.StatusOK, order)
}

func getServiceProvidersHandler(c *gin.Context) {
	service := c.Query("service")

	// open database connection
	db, err := sql.Open("mysql", "root:qwer1234@tcp(localhost:3306)/HomeServices")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer db.Close()

	// query service providers based on the service
	query := `
		SELECT sp.provider_id, sp.first_name, sp.last_name, sp.email_address, s.services_id AS service_id, s.service
		FROM ServiceProviders sp
		INNER JOIN Services s ON sp.service_id = s.services_id
		WHERE s.service = ?
	`
	rows, err := db.Query(query, service)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	serviceProviders := []ServiceProvider{}
	for rows.Next() {
		var serviceProvider ServiceProvider
		if err := rows.Scan(&serviceProvider.ID, &serviceProvider.FirstName, &serviceProvider.LastName, &serviceProvider.Email, &serviceProvider.ServiceID, &serviceProvider.Service); err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		serviceProviders = append(serviceProviders, serviceProvider)
	}

	c.JSON(http.StatusOK, serviceProviders)
}
func getOrderDetailsHandler(c *gin.Context) {
	customerEmail := c.Query("customer_email")

	db, err := sql.Open("mysql", "root:qwer1234@tcp(localhost:3306)/HomeServices")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer db.Close()

	query := `
		SELECT order_id, customer_email, provider_name, payment_method, totalPayment, Discount
		FROM OrderDetails
		WHERE customer_email = ?
	`

	rows, err := db.Query(query, customerEmail)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var orders []OrderDetails

	for rows.Next() {
		var order OrderDetails
		err := rows.Scan(
			&order.OrderID,
			&order.CustomerEmail,
			&order.ProviderName,
			&order.MethodName,
			&order.TotalPayment,
			&order.Discount,
		)
		if err != nil {
			log.Println(err)
			continue
		}

		orders = append(orders, order)
	}

	if err := rows.Err(); err != nil {
		log.Println(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, orders)
}
