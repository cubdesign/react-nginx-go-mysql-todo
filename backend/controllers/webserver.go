package controllers

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"react-nginx-go-mysql-todo/api"
)

func StartWebserver() {
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}

	router.Use(cors.New(config))

	apiTodoHandler := api.TodoHandler{}
	router.GET("/todo", apiTodoHandler.GetAllTodos)
	router.POST("/todo", apiTodoHandler.CreateTodo)
	router.GET("/todo/:id", apiTodoHandler.GetTodo)
	router.PUT("/todo/:id", apiTodoHandler.UpdateTodo)
	router.DELETE("/todo/:id", apiTodoHandler.DeleteTodo)

	router.Run(":8080")
}
