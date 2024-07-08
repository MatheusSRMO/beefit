import { AlunoContext } from '@/lib/aluno-context';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LocaleConfig, Calendar as RNCalendar } from 'react-native-calendars';
import { Theme } from 'react-native-calendars/src/types';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ],
  dayNamesShort: [
    'D',
    'S',
    'T',
    'Q',
    'Q',
    'S',
    'S'
  ],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'pt-br';


interface CalendarProps {
  onDayPress: (day: { dateString: string; }) => void;
}

export default function Calendar({ onDayPress }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState(['']);
  const {aluno} = React.useContext(AlunoContext);

  if ( !aluno ) {
    return null;
  }

  const formatDate = (date: Date) => {
    return date.toString().split("T")[0];
  }

  console.log({...aluno.treinos.reduce((acc, treino) => ({ ...acc, [formatDate(treino.updatedAt)]: { selected: true, marked: false, selectedColor: '#080835' } }), {})});
  
  return (
    <RNCalendar
      onDayPress={onDayPress}
      markingType="custom"
      markedDates={{
        // ...selectedDate.reduce((acc, date) => ({ ...acc, [date]: { selected: true, marked: false, selectedColor: '#080835' } }), {})
        ...aluno.treinos.reduce((acc, treino) => ({ ...acc, [formatDate(treino.updatedAt)]: { selected: true, marked: false, selectedColor: '#080835' } }), {}) 
      }}
      theme={{                     
        backgroundColor: '#4F99DD',
        calendarBackground: '#4F99DD',
        textSectionTitleColor: 'white',
        selectedDayBackgroundColor: '#080835',
        selectedDayTextColor: '#fff',
        todayTextColor: 'white',
        todayBackgroundColor: '#192C64',
        dayTextColor: 'white',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#74D3E7',
        arrowColor: '#FFDC98',
        monthTextColor: 'white',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: 'bold',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: 'bold',
        textMonthFontSize: 18,
        textDayHeaderFontSize: 19,
        'stylesheet.calendar.header': {
          week: {
            paddingTop: 10,
            borderTopWidth: 2,
            borderColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 10,
          }
        },
        'stylesheet.calendar.main': {
          week: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingHorizontal: 10,
          },
        },
        'stylesheet.day.basic': {
          base: {
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
          },
        },

      } as Theme}
      style={{
        borderRadius: 20,
        borderWidth: 0,
        borderColor: 'transparent',
        width: 300,
        paddingBottom: 10,
      }}

      // markingType={'period'}
      renderArrow={(direction: any) => (
        <Text className='text-white text-2xl'>{direction === 'left' ? '<' : '>'}</Text>
      )}
      renderHeader={(date: any) => (
        <Text className='text-white font-bold text-2xl'>{date.toString('MMMM yyyy')}</Text>
      )}
    />
  );
};
