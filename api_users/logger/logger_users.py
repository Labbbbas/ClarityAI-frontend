import logging as log

class Logger:
    def __init__(self, log_file='api_users.log', level=log.INFO):
        log.basicConfig(
            level=level,
            format='%(asctime)s: %(levelname)s [%(filename)s:%(lineno)s] %(message)s',
            datefmt='%I:%M:%S %p',
            handlers=[
                log.FileHandler(log_file),
                log.StreamHandler()
            ]
        )
        self.logger = log.getLogger()

    def debug(self, message):
        self.logger.debug(message, stacklevel=2)
   
    def info(self, message):
        self.logger.info(message, stacklevel=2)
   
    def warning(self, message):
        self.logger.warning(message, stacklevel=2)

    def error(self, message):
        self.logger.error(message, stacklevel=2)
   
    def critical(self, message):
        self.logger.critical(message, stacklevel=2)

if __name__ == '__main__':
    logger = Logger()
    logger.debug('Message level: DEBUG')
    logger.info('Message level: INFO')
    logger.warning('Message level: WARNING')
    logger.error('Message level: ERROR')
    logger.critical('Message level: CRITICAL')