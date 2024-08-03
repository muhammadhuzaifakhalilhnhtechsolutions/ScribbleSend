import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { Black, THEME_COLOR, White } from '../../utils/Color';
import { PopingBold } from '../../utils/Fonts';

const PDFViewer = ({ pdfUrl }) => {
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: pdfUrl, cache: true, method: 'GET' }}
        trustAllCerts={false}
        enableDoubleTapZoom={true}
        style={styles.pdf}
        renderActivityIndicator={progress => {
          return (
            <>
              <ActivityIndicator size={'large'} color={THEME_COLOR} />
              <Text style={styles.textStyle}>
                Processing: {Math.round(progress)}%
              </Text>
            </>
          );
        }}
        onPageChanged={(page, numberOfPages) => {
          setpage(page);
          settotalPages(numberOfPages);
        }}
        onError={error => {
          console.log('pdf load error==>', error);
        }}
      />
      <View style={styles.pageTextDiv}>
        <Text style={{ color: White }}>
          {page}/{totalPages}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  pageTextDiv: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 4,
    justifyContent: 'center',
  },
  textStyle: {
    color: Black,
    fontFamily: PopingBold,
    fontSize: 12,
  },
});

export default PDFViewer;
