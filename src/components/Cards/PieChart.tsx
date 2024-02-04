import { PieChart } from 'react-native-gifted-charts';
import { Box } from '../Base';
import { Text } from '../Typography';
import { Dimensions } from 'react-native';
export const PieCharts = () => {
  const pieData = [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
    { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
    { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
  ];

  const renderDot = (color: string) => {
    return (
      <Box
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };
  const { width } = Dimensions.get('screen');

  const renderLegendComponent = () => {
    return (
      <>
        <Box
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <Box
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot('#006DFF')}
            <Text variant={'medium12'} style={{ color: 'white' }}>
              Rice: 47%
            </Text>
          </Box>
          <Box
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}
          >
            {renderDot('#8F80F3')}
            <Text variant={'medium12'} style={{ color: 'white' }}>
              Amala: 16%
            </Text>
          </Box>
        </Box>
        <Box style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Box
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot('#3BE9DE')}
            <Text variant={'medium12'} style={{ color: 'white' }}>
              Wheat: 40%
            </Text>
          </Box>
          <Box
            style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}
          >
            {renderDot('#FF7F97')}
            <Text variant={'medium12'} style={{ color: 'white' }}>
              Poundo: 3%
            </Text>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        style={{
          margin: 20,
          padding: 16,
          width: '95%',
          borderRadius: 20,
          backgroundColor: '#232B5D',
        }}
      >
        <Text
          variant={'medium12'}
          style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
        >
          Performance
        </Text>
        <Box style={{ padding: 20, alignItems: 'center' }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => {
              return (
                <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    variant={'medium12'}
                    style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}
                  >
                    47%
                  </Text>
                  <Text
                    variant={'medium12'}
                    style={{ fontSize: 14, color: 'white' }}
                  >
                    Rice
                  </Text>
                </Box>
              );
            }}
          />
        </Box>
        {renderLegendComponent()}
      </Box>
    </>
  );
};
