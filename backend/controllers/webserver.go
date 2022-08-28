package controllers

import (
	"context"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"react-nginx-go-mysql-todo/api"
	"react-nginx-go-mysql-todo/models"
	"strings"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {

		authorizationToken := ctx.GetHeader("Authorization")

		idToken := strings.TrimSpace(strings.Replace(authorizationToken, "Bearer", "", 1))
		if idToken == "" {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "Id token not available"})
			return
		}

		//verify token
		token, err := models.FirebaseAuth.VerifyIDToken(context.Background(), idToken)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid token"})
			return
		}

		ctx.Set("UUID", token.UID)
		log.Printf("uuid: %v", token.UID)
		ctx.Next()
	}
}

func StartWebserver() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowHeaders = append(config.AllowHeaders, "Authorization")
	config.AllowOrigins = []string{"http://localhost:3000"}

	r.Use(cors.New(config))

	r.Use(AuthMiddleware())

	apiTodoHandler := api.TodoHandler{}
	r.GET("/todo", apiTodoHandler.GetAllTodos)
	r.POST("/todo", apiTodoHandler.CreateTodo)
	r.GET("/todo/:id", apiTodoHandler.GetTodo)
	r.PUT("/todo/:id", apiTodoHandler.UpdateTodo)
	r.DELETE("/todo/:id", apiTodoHandler.DeleteTodo)

	r.Run(":8080")
}
