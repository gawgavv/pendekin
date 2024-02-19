import { Entity, Column, OneToMany } from 'typeorm';

import { Click } from '../../clicks/entities/click.entity';

@Entity({
    name: `Urls`
})
export class Url {

    @Column({
        type: `varchar`,
        primary: true,
        primaryKeyConstraintName: `ShortUrlIdPrimaryKey`,
        unique: true
    })
    id: string;

    @Column({
        type: `varchar`
    })
    origin: string;

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

    @OneToMany(
        () => Click,
        (clicks) => clicks,
        { onDelete: `CASCADE` }
    )
    clicks: Click[];
}
