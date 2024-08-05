package com.ecosun.entities;

import java.time.LocalDate;
import java.util.List;

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
@Table(name = "user_order")
public class UserOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String deliveryAddress;
    private String orderStatus;
    private Double totalAmount;
    
//	private String paymentMethod;
    
//    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<PaymentDetails> paymentDetails;
    
//    private String paymentStatus;
    
    @CreationTimestamp //adds current date when the entity is created(only once!)
	@Column(name="order_date")
	private LocalDate orderDate;
    
    private Product product;
    
    @CreationTimestamp //adds current date when the entity is created(only once!)
	@Column(name="creation_date")
	private LocalDate creationDate;
	@UpdateTimestamp//adds the current date every time the entity is updated
	@Column(name="updated_on")
	private LocalDate updatedOn;
	

    
}
