import { ApiProperty } from '@nestjs/swagger';

export class ValidatedUser {
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: string;

  @ApiProperty({ description: 'User\'s email address' })
  email: string;

  @ApiProperty({ description: 'User\'s first name', required: false })
  nom: string;

  @ApiProperty({ description: 'User\'s last name', required: false })
  prenom: string;

  @ApiProperty({ description: 'User\'s phone number', required: false })
  telephone: string;

  @ApiProperty({ 
    description: 'User\'s role', 
    enum: ['user', 'admin', 'agriculteur', 'jury', 'responsable'],
    default: 'user',
    required: true
  })
  role: 'user' | 'admin' | 'agriculteur' | 'jury' | 'responsable';

  @ApiProperty({ description: 'User\'s address', required: false })
  adresse?: string;

  @ApiProperty({ description: 'User\'s region', required: false })
  region?: string;

  @ApiProperty({ 
    description: 'Farm surface area', 
    type: Number,
    required: false 
  })
  surfaceFerme?: number;

  @ApiProperty({ 
    description: 'Number of cows in the farm',
    type: Number,
    required: false 
  })
  nbrVaches?: number;

}
