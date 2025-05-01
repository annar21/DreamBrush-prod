import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';

interface DraggableBottomModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    children?: React.ReactNode;
}

const DraggableBottomModal = ({visible, setVisible, children}: DraggableBottomModalProps) => {

    return (
        <View style={styles.container}>
            <Modal
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                onSwipeComplete={() => setVisible(false)}
                swipeDirection="down"
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <View style={styles.handle} />

                    <View>
                        {children}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    handle: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        borderRadius: 3,
        marginBottom: 15,
    },
});


export default DraggableBottomModal;
