package api

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"react-nginx-go-mysql-todo/models"
	"react-nginx-go-mysql-todo/utils"
)

type UserHandler struct {
}

func (h *UserHandler) GetAllUsers(ctx *gin.Context) {
	users := models.GetUsers()
	ctx.JSON(http.StatusOK, users)
}

func (h *UserHandler) GetUser(ctx *gin.Context) {
	strId := ctx.Param("id")
	id, err := utils.StringToUint(strId)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	user := models.GetUser(id)
	if user == nil {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (h *UserHandler) CreateUser(ctx *gin.Context) {
	var user models.User
	err := ctx.ShouldBindJSON(&user)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
	}
	user.Create()
	ctx.JSON(http.StatusOK, &user)
}

func (h *UserHandler) UpdateUser(ctx *gin.Context) {
	strId := ctx.Param("id")
	id, err := utils.StringToUint(strId)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	user := models.GetUser(id)
	if user == nil {
		ctx.AbortWithStatus(http.StatusNotFound)
		return
	}

	err = ctx.ShouldBindJSON(&user)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	user.ID = id
	user.Save()
	ctx.JSON(http.StatusOK, &user)
}

func (h *UserHandler) DeleteUser(ctx *gin.Context) {
	strId := ctx.Param("id")
	id, err := utils.StringToUint(strId)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
	user := models.User{
		ID: id,
	}
	user.Delete()
	ctx.JSON(http.StatusOK, user)
}

func (h *UserHandler) CreateUserByUUID(ctx *gin.Context) {
	var user models.User
	err := ctx.ShouldBindJSON(&user)
	if err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
	}

	if user.UUID == "" || user.UUID != ctx.MustGet("UUID").(string) {
		ctx.AbortWithStatus(http.StatusBadRequest)
	}

	dbUser := models.GetUserByUUID(user.UUID)
	if dbUser != nil {
		ctx.JSON(http.StatusOK, &user)
		return
	}

	user.Create()
	ctx.JSON(http.StatusOK, &user)
}
