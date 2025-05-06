import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DonationHistory } from 'src/db/entities/donate-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DonateHistoryService {
    @InjectRepository(DonationHistory)
    private readonly donationHistoryRepository: Repository<DonationHistory>;

    async getAll(): Promise<DonationHistory[]> {
        return this.donationHistoryRepository.find({ relations: ['donor', 'receiver', 'item'] });
    }

    async getDonationHistoryById(id: number): Promise<DonationHistory> {
        const donationHistoryOne = await this.donationHistoryRepository.findOne({where: {id}, relations: ['donor', 'receiver', 'item']})
        if (!donationHistoryOne) {
            throw new Error('Donation history not found');
        }
        return donationHistoryOne;
    }

    async createDonationHistory(donationHistory: DonationHistory): Promise<DonationHistory> {
        return this.donationHistoryRepository.save(donationHistory);
    }

    async updateDonationHistory(id: number, donationHistory: DonationHistory): Promise<DonationHistory> {
        const donationHistoryToUpdate = await this.donationHistoryRepository.findOne({where: {id}})
        if (!donationHistoryToUpdate) {
            throw new Error('Donation history not found');
        }
        return this.donationHistoryRepository.save({ ...donationHistoryToUpdate, ...donationHistory });
    }
}
