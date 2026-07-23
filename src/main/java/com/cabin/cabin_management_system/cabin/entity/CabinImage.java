package com.cabin.cabin_management_system.cabin.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cabin_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class CabinImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cabin_id")
    private Cabin cabin;
}