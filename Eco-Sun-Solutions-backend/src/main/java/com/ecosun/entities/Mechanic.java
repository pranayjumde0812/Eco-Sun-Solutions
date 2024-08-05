package com.ecosun.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
public class Mechanic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mechanicId;

    private String mechanicName;
    private String mechanicAddress;
    private String mechanicMobileNo;
    private String mechanicEmail;
    private Double mechanicSalary;
    private String mechanicSpecialization;

    @CreationTimestamp //adds current date when the entity is created(only once!)
	@Column(name="creation_date")
	private LocalDate creationDate;
	@UpdateTimestamp//adds the current date every time the entity is updated
	@Column(name="updated_on")
	private LocalDate updatedOn;
	

    
}
