import { Test } from '@nestjs/testing';
import { HookFiltersService } from '../services/hook-filters.service';
import { HookFiltersController } from './hook-filters.controller';
import type { TestingModule } from '@nestjs/testing';

describe('HookFiltersController', () => {
  let controller: HookFiltersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HookFiltersController],
      providers: [HookFiltersService],
    }).compile();

    controller = module.get<HookFiltersController>(HookFiltersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
