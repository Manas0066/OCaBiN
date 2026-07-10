package com.cabin.cabin_management_system.cabin.entity;

import com.cabin.cabin_management_system.common.enums.CabinStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "cabins")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Cabin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String cabinName;

    @Column(nullable = false)
    private Integer floor;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private String location;

    @ElementCollection
    @CollectionTable(
            name = "cabin_amenities",
            joinColumns = @JoinColumn(name = "cabin_id")
    )
    @Column(name = "amenity")
    private List<String> amenities;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CabinStatus status;

    @Column(nullable = false)
    private Boolean active;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;
}