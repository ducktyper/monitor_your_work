package main

import (
    "net/http"
    "log"
    "os"
)

func chromeHandleFunc(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")

    err := r.ParseMultipartForm(0)
    if err != nil{
        panic(err)
    }

    f, err := os.OpenFile(os.Getenv("HOME") + "/projects/monitor_your_work/log/chrome.log", os.O_RDWR | os.O_CREATE | os.O_APPEND, 0666)
    if err != nil {
        panic(err)
    }
    defer f.Close()

    log.SetOutput(f)
    log.Println(r.PostFormValue("url"), r.PostFormValue("title"))
}

func main() {
    http.HandleFunc("/chrome", chromeHandleFunc)
    http.ListenAndServe(":3333", nil)
}
