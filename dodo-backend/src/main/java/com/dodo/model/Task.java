package com.dodo.model;

import jakarta.persistence.*;

@Entity
public class Task {

    // id is the primary key
    // GeneratedValue is used to auto-generate the id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // title is the title of the task
    private String title;
    private Boolean completed;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
