package controllers

import (
	"github.com/gin-gonic/gin"
	"react-nginx-go-mysql-todo/api"
)

func StartWebserver() {
	router := gin.Default()
	apiTodoHandler := api.TodoHandler{}
	router.GET("/todo", apiTodoHandler.GetAllTodos)
	router.POST("/todo", apiTodoHandler.CreateTodo)
	router.GET("/todo/:id", apiTodoHandler.GetTodo)
	router.PUT("/todo/:id", apiTodoHandler.UpdateTodo)
	router.DELETE("/todo/:id", apiTodoHandler.DeleteTodo)

	router.Run(":8080")
}
