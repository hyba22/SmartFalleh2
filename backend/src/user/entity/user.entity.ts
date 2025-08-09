import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nom: string;

    @Column()
    prenom: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;
    
    @Column({
        type: 'enum',
        enum: ['user', 'admin', 'agriculteur', 'jury', 'responsable'],
        default: 'user'
    })
    role: 'user' | 'admin' | 'agriculteur' | 'jury' | 'responsable';
    
    @Column({ nullable: true })
    nbrVaches: number;

    @Column({ nullable: true })
    telephone: string;

    @Column({ nullable: true })
    adresse: string;

    @Column({ nullable: true })
    region: string;

    @Column({ nullable: true })
    surfaceFerme: number;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}

export default User;