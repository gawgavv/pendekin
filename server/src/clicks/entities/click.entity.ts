import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

import { Url } from '../../urls/entities/url.entity';

@Entity({
    name: `Clicks`
})
export class Click {

    @PrimaryGeneratedColumn(`increment`)
    id: number;

    @Column({
        type: `varchar`,
        foreignKeyConstraintName: `ClickFKOnUrl`
    })
    @Index()
    urlId: string;

    @Column({
        type: `timestamptz`,
        default: () => `NOW()`
    })
    createdAt: Date;

    @Column({
        type: `timestamptz`,
        default: () => `NOW()`
    })
    updatedAt: Date;

    @ManyToOne(
        () => Url,
        (url) => url.clicks
    )
    @JoinColumn({
        name: `urlId`,
        foreignKeyConstraintName: `ClickFKOnUrl`
    })
    click: Click;

}
