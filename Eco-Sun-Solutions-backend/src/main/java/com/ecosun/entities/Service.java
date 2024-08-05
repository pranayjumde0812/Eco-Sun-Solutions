package com.ecosun.entities;
import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    private String serviceType;
    private String currentServiceStatus;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer rating;

    @ManyToOne
    @JoinColumn(name = "mechanic_id")
    private Mechanic mechanic;

    @CreationTimestamp //adds current date when the entity is created(only once!)
	@Column(name="creation_date")
	private LocalDate creationDate;
	@UpdateTimestamp//adds the current date every time the entity is updated
	@Column(name="updated_on")
	private LocalDate updatedOn;
	
	
}

