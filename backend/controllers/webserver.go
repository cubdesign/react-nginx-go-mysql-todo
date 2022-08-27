package controllers

import (
	"context"
	firebase "firebase.google.com/go/v4"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"react-nginx-go-mysql-todo/api"
)

func StartWebserver() {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowHeaders = append(config.AllowHeaders, "Authorization")
	config.AllowOrigins = []string{"http://localhost:3000"}

	router.Use(cors.New(config))

	app, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		log.Fatalf("error initializing firebase admin app: %v\n", err)
	}
	log.Printf("app:%T", app)

	apiTodoHandler := api.TodoHandler{}
	router.GET("/todo", apiTodoHandler.GetAllTodos)
	router.POST("/todo", apiTodoHandler.CreateTodo)
	router.GET("/todo/:id", apiTodoHandler.GetTodo)
	router.PUT("/todo/:id", apiTodoHandler.UpdateTodo)
	router.DELETE("/todo/:id", apiTodoHandler.DeleteTodo)

	router.Run(":8080")
}
