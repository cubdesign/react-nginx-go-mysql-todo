package models

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	UUID      string         `json:"UUID" gorm:"unique,not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

func (t *User) Create() {
	Db.Create(&t)
}

func (t *User) Save() {
	Db.Save(&t)
}

func (t *User) Delete() {
	Db.Delete(&t)
}

func GetUsers() []User {
	var users []User
	Db.Order("created_at desc").Find(&users)
	return users
}

func GetUser(id uint) *User {
	var user User
	result := Db.First(&user, id)
	if result.Error != nil {
		return nil
	}
	return &user
}

func GetUserByUUID(UUID string) *User {
	var user User
	result := Db.Where("UUID = ?", UUID).First(&user)
	if result.Error != nil {
		return nil
	}
	return &user
}
