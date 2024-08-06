package com.ecosun.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private Long productId;

    @Column(name="product_name")
    private String productName;
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;
    
    @Column(name="desciption")
    private String description;
    
    @Column(name="manufacturer")
    private String manufacturer;
    
    @Column(name="wattage")
    private Double wattage;
    
    @Column(name = "ampere")
    private Double ampere;
    
    @Column(name = "weight")
    private Double weight;
    
    @Column(name = "efficiency")
    private Double efficiency;
    
    @Column(name = "unit_price")
    private Double unitPrice;
    
    @Column(name = "dimensions")
    private String dimensions;
    
    @Column(name = "availability")
    private String availability;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "rating")
    private Double rating;

    @CreationTimestamp //adds current date when the entity is created(only once!)
	@Column(name="creation_date")
	private LocalDate creationDate;
    
	@UpdateTimestamp//adds the current date every time the entity is updated
	@Column(name="updated_on")
	private LocalDate updatedOn;
	
	
}
