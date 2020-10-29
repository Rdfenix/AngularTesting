import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    calculator = TestBed.inject(CalculatorService);
  });

  it('should add two numbers', () => {
    // const logger = new LoggerService();

    // fake spy created to simulate a logger service and you methods
    // const logger = jasmine.createSpyObj('LoggerService', ['log']);

    // spyOn(logger, 'log');
    // const calculator = new CalculatorService(logger);

    const result = calculator.add(2, 2);

    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    // pending();

    // const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0);
  });
});
