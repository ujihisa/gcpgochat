// Sample run-helloworld is a minimal Cloud Run service.
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
)

type message struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Body string `json:"body"`
}

type response struct {
	Messages []message `json:"messages"`
}

func main() {
	log.Print("starting server...")
	http.HandleFunc("/", handler)

	// Determine port for HTTP service.
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("defaulting to port %s", port)
	}

	// Start HTTP server.
	log.Printf("listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	id := rand.Int()
	body := fmt.Sprintf("hello %v", id)
	x, _ := json.Marshal(response{[]message{message{id, "random", body}}})
	fmt.Fprintf(w, string(x))
}
