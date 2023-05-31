package com.kreitek.store.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "itemSequence")
    private Long id;

    @Column(nullable = false, length = 100)
    @Size(min = 3, max = 100)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    @Positive
    private Double price;

    @Lob
    private byte[] image;

    @ManyToOne()
    @JoinColumn(name = "category_id", nullable = false)
    private Category category; // para definir las relacciones

    public Item() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
