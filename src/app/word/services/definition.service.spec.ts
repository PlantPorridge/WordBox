import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DefinitionService } from './definition.service';


describe('DefinitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: DefinitionService = TestBed.get(DefinitionService);
    expect(service).toBeTruthy();
  });
});
