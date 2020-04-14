package main

import (
	"backend/api-server/router"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	e := router.InitEcho()

	e.Logger.Fatal(e.Start(":" + port))
}
