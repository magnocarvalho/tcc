import { TestBed } from '@angular/core/testing';

import { AnimationsService } from './animations.service';

describe('AnimationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimationsService = TestBed.get(AnimationsService);
    expect(service).toBeTruthy();
  });
});
