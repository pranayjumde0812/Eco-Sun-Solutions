package com.ecosun.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
public class PaymentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

//  @ManyToOne
//  @JoinColumn(name = "order_id")
//  private UserOrder order;

    private UserOrder orderId;
    
    private Long transactionId;
    private LocalDateTime transactionDate;
//  private Double totalAmount;
    private String paymentMethod;
//  private String transactionId;
    private String paymentStatus;

//  @CreationTimestamp //adds current date when the entity is created(only once!)
//	@Column(name="creation_date")
//	private LocalDate creationDate;
//	@UpdateTimestamp//adds the current date every time the entity is updated
//	@Column(name="updated_on")
//	private LocalDate updatedOn;
	
}
