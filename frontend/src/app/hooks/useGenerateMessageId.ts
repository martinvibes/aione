import generateUniqueId from 'generate-unique-id';
export const useGenerateMessageId = () => {
    const messageId = generateUniqueId({
      length: 32,
      useLetters: true
    });
    return messageId;
}
