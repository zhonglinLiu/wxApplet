<?php
namespace app\api\command;
use think\Console\Command;
use think\Console\Input;
use think\Console\Output;

class Email extends Command{
	protected function configure()
    {
        $this->setName('sendEmail')->setDescription('send email');
    }

    protected function execute(Input $input, Output $output)
    {
        $output->writeln("TestCommand:");
    }
}