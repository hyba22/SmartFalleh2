import { ApiProperty } from '@nestjs/swagger';

export class ValidatedUser {
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: string;

  @ApiProperty({ description: 'User\'s email address' })
  email: string;

  @ApiProperty({ description: 'User\'s first name' })
  nom?: string;

  @ApiProperty({ description: 'User\'s last name' })
  prenom?: string;

  @ApiProperty({ description: 'User\'s phone number' })
  telephone?: string;

  @ApiProperty({ 
    description: 'User\'s role', 
    enum: ['user', 'agriculteur', 'jury', 'responsable'],
    default: 'user' 
  })
  role: string;

  @ApiProperty({ description: 'User\'s address', required: false })
  adresse?: string;

  @ApiProperty({ description: 'User\'s region', required: false })
  region?: string;

  @ApiProperty({ description: 'User\'s surface', required: false })
  surfaceFerme?: string;

  @ApiProperty({ description: 'User\'s number of cows', required: false })
  nbrVaches?: number;

}
