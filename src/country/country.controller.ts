import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('')
  async create(@Body() createCountryDto: CreateCountryDto) {
    const countries = [
      {
        title: 'Австралия',
        count: 1137,
      },
      {
        title: 'Азербайджан',
        count: 1,
      },
      {
        title: 'Алжир',
        count: 1,
      },
      {
        title: 'Ангола',
        count: 2,
      },
      {
        title: 'Аргентина',
        count: 239,
      },
      {
        title: 'Армения',
        count: 20,
      },
      {
        title: 'Багамы',
        count: 2,
      },
      {
        title: 'Бангладеш',
        count: 1,
      },
      {
        title: 'Бельгия',
        count: 1,
      },
      {
        title: 'Бермуды',
        count: 1,
      },
      {
        title: 'Бирма',
        count: 1,
      },
      {
        title: 'Боливия',
        count: 3,
      },
      {
        title: 'Ботсвана',
        count: 1,
      },
      {
        title: 'Бразилия',
        count: 371,
      },
      {
        title: 'Бутан',
        count: 3,
      },
      {
        title: 'Вануату',
        count: 2,
      },
      {
        title: 'Великобритания',
        count: 40,
      },
      {
        title: 'Венесуэла',
        count: 51,
      },
      {
        title: 'Вьетнам',
        count: 66,
      },
      {
        title: 'Вьетнам Северный',
        count: 6,
      },
      {
        title: 'Гаити',
        count: 1,
      },
      {
        title: 'Гана',
        count: 5,
      },
      {
        title: 'Гватемала',
        count: 2,
      },
      {
        title: 'Германия',
        count: 3,
      },
      {
        title: 'Германия (ФРГ)',
        count: 5,
      },
      {
        title: 'Гонконг',
        count: 1658,
      },
      {
        title: 'Гренландия',
        count: 1,
      },
      {
        title: 'Греция',
        count: 1,
      },
      {
        title: 'Грузия',
        count: 9,
      },
      {
        title: 'Доминикана',
        count: 25,
      },
      {
        title: 'Египет',
        count: 27,
      },
      {
        title: 'Израиль',
        count: 166,
      },
      {
        title: 'Индия',
        count: 4920,
      },
      {
        title: 'Индонезия',
        count: 133,
      },
      {
        title: 'Иордания',
        count: 2,
      },
      {
        title: 'Иран',
        count: 53,
      },
      {
        title: 'Ирландия',
        count: 7,
      },
      {
        title: 'Испания',
        count: 30,
      },
      {
        title: 'Италия',
        count: 11,
      },
      {
        title: 'Казахстан',
        count: 170,
      },
      {
        title: 'Камбоджа',
        count: 8,
      },
      {
        title: 'Камерун',
        count: 1,
      },
      {
        title: 'Канада',
        count: 1183,
      },
      {
        title: 'Катар',
        count: 5,
      },
      {
        title: 'Кения',
        count: 5,
      },
      {
        title: 'Киргизия',
        count: 8,
      },
      {
        title: 'Китай',
        count: 5345,
      },
      {
        title: 'Колумбия',
        count: 86,
      },
      {
        title: 'Корея северная',
        count: 11,
      },
      {
        title: 'Корея южная',
        count: 5890,
      },
      {
        title: 'Коста-рика',
        count: 3,
      },
      {
        title: 'Куба',
        count: 10,
      },
      {
        title: 'Кувейт',
        count: 1,
      },
      {
        title: 'Лаос',
        count: 1,
      },
      {
        title: 'Ливан',
        count: 18,
      },
      {
        title: 'Люксембург',
        count: 1,
      },
      {
        title: 'Маврикий',
        count: 2,
      },
      {
        title: 'Макао',
        count: 3,
      },
      {
        title: 'Малайзия',
        count: 59,
      },
      {
        title: 'Марокко',
        count: 3,
      },
      {
        title: 'Мексика',
        count: 481,
      },
      {
        title: 'Мозамбик',
        count: 1,
      },
      {
        title: 'Монголия',
        count: 14,
      },
      {
        title: 'Мьянма',
        count: 2,
      },
      {
        title: 'Намибия',
        count: 2,
      },
      {
        title: 'Непал',
        count: 9,
      },
      {
        title: 'Нигерия',
        count: 48,
      },
      {
        title: 'Нидерланды',
        count: 3,
      },
      {
        title: 'Никарагуа',
        count: 1,
      },
      {
        title: 'ОАЭ',
        count: 23,
      },
      {
        title: 'Оккупированная Палестинская Территория',
        count: 1,
      },
      {
        title: 'Пакистан',
        count: 71,
      },
      {
        title: 'Палестина',
        count: 2,
      },
      {
        title: 'Панама',
        count: 5,
      },
      {
        title: 'Парагвай',
        count: 3,
      },
      {
        title: 'Перу',
        count: 30,
      },
      {
        title: 'Польша',
        count: 26,
      },
      {
        title: 'Пуэрто Рико',
        count: 7,
      },
      {
        title: 'Россия',
        count: 7,
      },
      {
        title: 'СССР',
        count: 5709,
      },
      {
        title: 'США',
        count: 427,
      },
      {
        title: 'Саудовская Аравия',
        count: 11,
      },
      {
        title: 'Северная македония',
        count: 1,
      },
      {
        title: 'Сенегал',
        count: 2,
      },
      {
        title: 'Сент-китс и невис',
        count: 4,
      },
      {
        title: 'Сингапур',
        count: 70,
      },
      {
        title: 'Сирия',
        count: 5,
      },
      {
        title: 'Таиланд',
        count: 1417,
      },
      {
        title: 'Тайвань',
        count: 515,
      },
      {
        title: 'Тунис',
        count: 1,
      },
      {
        title: 'Турция',
        count: 1046,
      },
      {
        title: 'Узбекистан',
        count: 13,
      },
      {
        title: 'Уругвай',
        count: 14,
      },
      {
        title: 'Фиджи',
        count: 1,
      },
      {
        title: 'Филиппины',
        count: 188,
      },
      {
        title: 'Финляндия',
        count: 2,
      },
      {
        title: 'Франция',
        count: 37,
      },
      {
        title: 'Хорватия',
        count: 1,
      },
      {
        title: 'Чехословакия',
        count: 94,
      },
      {
        title: 'Чили',
        count: 73,
      },
      {
        title: 'Швейцария',
        count: 1,
      },
      {
        title: 'Швеция',
        count: 1,
      },
      {
        title: 'Шри-ланка',
        count: 1,
      },
      {
        title: 'Эквадор',
        count: 6,
      },
      {
        title: 'ЮАР',
        count: 125,
      },
      {
        title: 'Югославия',
        count: 49,
      },
      {
        title: 'Югославия (ФР)',
        count: 5,
      },
      {
        title: 'Япония',
        count: 22896,
      },
    ];
    return await this.countryService.create(
      countries.map((item) => ({ title: item.title })),
    );
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}
