import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {

    if(type === 'outcome'){
      const balance = this.transactionsRepository.getBalance();
      if(value > balance.total){
        throw Error("Insufficient balance. Withdrawal of "
          .concat(value.toString()
          .concat(' will not be allowed.')));
      }
    }

    const transation = this.transactionsRepository.create({title, value, type});

    return transation;
  }
}

export default CreateTransactionService;
