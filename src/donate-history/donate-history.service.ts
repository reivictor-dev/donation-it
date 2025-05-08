import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonationHistory } from 'src/db/entities/donate-history.entity';
import { Item } from 'src/db/entities/item.entity';
import { User } from 'src/db/entities/user.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class DonateHistoryService {
    @InjectRepository(DonationHistory)
    private readonly donationHistoryRepository: Repository<DonationHistory>;

    async getAll(){
        return await this.donationHistoryRepository.find()
    }

    async getById(id: number){
        return await this.donationHistoryRepository.findOneBy({id})
    }

    async donate(donor: User, receiver: User, item: Item){
        if(donor.id === receiver.id) throw new ForbiddenException('Donor and receiver cannot be the same user')
        
        if(donor.id === item.owner.id) throw new BadRequestException('Donor cannot be the owner of the item')

        if(receiver.id === item.owner.id) throw new BadRequestException('Receiver cannot be the owner of the item')

        const existingDonation = await this.donationHistoryRepository.findOne({
            where: { item: item, status: Not('COMPLETED') }
        })  

        if(existingDonation) throw new BadRequestException('Item is already in a donation process')

        const donationHistory = this.donationHistoryRepository.create({
            donor,
            receiver,
            item,
            status: 'PENDING'
        })
        return await this.donationHistoryRepository.save(donationHistory)
    }

    async updateStatus(id: number, status: 'PENDING' | 'COMPLETED'){
        const donationHistory = await this.getById(id)

        if(!donationHistory) throw new NotFoundException('Donation not found')

        donationHistory.status = status
        return await this.donationHistoryRepository.save(donationHistory)
    }
}
