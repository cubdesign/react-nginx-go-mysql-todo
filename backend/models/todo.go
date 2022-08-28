package models

import (
	"gorm.io/gorm"
	"time"
)

const (
	TodoStatusIncomplete int = 0
	TodoStatusComplted   int = 1
)

type Todo struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Text      string         `json:"text"`
	Status    int            `json:"status"`
	UserID    uint           `json:"user_id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

func (t *Todo) Create() {
	Db.Create(&t)
}

func (t *Todo) Save() {
	Db.Save(&t)
}

func (t *Todo) Delete() {
	Db.Delete(&t)
}

func GetTodos(userID uint) []Todo {
	var todos []Todo
	Db.Order("created_at desc").Find(&todos, "user_id = ?", userID)
	return todos
}

func GetTodo(id uint, userID uint) *Todo {
	var todo Todo
	result := Db.First(&todo, "id = ? AND user_id = ?", id, userID)
	if result.Error != nil {
		return nil
	}
	return &todo
}
