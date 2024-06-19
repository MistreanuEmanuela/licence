package com.example.PetPulse.services;

import com.example.PetPulse.models.dto.QuickInfoCatsDTO.QuickInfoCatDTO;
import com.example.PetPulse.models.entities.QuickInfoCat;
import com.example.PetPulse.repositories.QuickInfoCatRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class CatInfoServiceImpTest {

    @Mock
    private QuickInfoCatRepository mockRepository;

    @InjectMocks
    private CatInfoServiceImp catInfoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetCatInfo() {
        int catId = 1;
        QuickInfoCat mockCat = createMockCat(catId);
        when(mockRepository.findInfoById((long) catId)).thenReturn((mockCat));

        QuickInfoCatDTO catDTO = catInfoService.getCatInfo(catId);

        assertNotNull(catDTO);
        assertEquals(catId, catDTO.getIdCat());
        assertEquals("TestOrigin", catDTO.getOrigin());
        assertEquals("TestSize", catDTO.getSize());
        assertEquals("TestLifespan", catDTO.getLifespan());
        assertEquals("TestCoat", catDTO.getCoat());
        assertEquals("TestTemperament", catDTO.getTemperament());

        verify(mockRepository, times(1)).findInfoById((long) catId);
        verifyNoMoreInteractions(mockRepository);
    }

    private QuickInfoCat createMockCat(int catId) {
        QuickInfoCat mockCat = new QuickInfoCat();
        mockCat.setIdCat(catId);
        mockCat.setOrigin("TestOrigin");
        mockCat.setSize("TestSize");
        mockCat.setLifespan("TestLifespan");
        mockCat.setCoat("TestCoat");
        mockCat.setTemperament("TestTemperament");
        return mockCat;
    }
}
