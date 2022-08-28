package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"react-nginx-go-mysql-todo/models"
	"react-nginx-go-mysql-todo/utils"
)

type TodoHandler struct {
}

func (h *TodoHandler) GetAllTodos(ctx *gin.Context) {
	user := models.GetUserByUUID(ctx.MustGet("UUID").(string))
	if user == nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}
	todos := models.GetTodos(user.ID)
	ctx.JSON(http.StatusOK, todos)
}

func (h *TodoHandler) GetTodo(ctx *gin.Context) {
	user := models.GetUserByUUID(ctx.MustGet("UUID").(string))
	if user == nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}
	strId := ctx.Param("id")
	id, err := utils.StringToUint(strId)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	todo := models.GetTodo(id, user.ID)
	if todo == nil {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}
	ctx.JSON(http.StatusOK, todo)
}

func (h *TodoHandler) CreateTodo(ctx *gin.Context) {
	user := models.GetUserByUUID(ctx.MustGet("UUID").(string))
	if user == nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}
	var todo models.Todo
	err := ctx.ShouldBindJSON(&todo)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
	}
	todo.UserID = user.ID
	todo.Create()
	ctx.JSON(http.StatusOK, &todo)
}

func (h *TodoHandler) UpdateTodo(ctx *gin.Context) {
	user := models.GetUserByUUID(ctx.MustGet("UUID").(string))
	if user == nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}
	strId := ctx.Param("id")
	id, err := utils.StringToUint(strId)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	todo := models.GetTodo(id, user.ID)
	if todo == nil {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	err = ctx.ShouldBindJSON(&todo)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	todo.ID = id
	todo.Save()
	ctx.JSON(http.StatusOK, &todo)
}

func (h *TodoHandler) DeleteTodo(ctx *gin.Context) {
	user := models.GetUserByUUID(ctx.MustGet("UUID").(string))
	if user == nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}
	strId := ctx.Param("id")
	id, err := utils.StringToUint(strId)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	todo := models.GetTodo(id, user.ID)
	if todo == nil {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	todo.Delete()
	ctx.JSON(http.StatusOK, todo)
}
